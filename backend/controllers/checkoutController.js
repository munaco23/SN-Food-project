const odooService = require('../services/odooService');

exports.processCheckout = async (req, res, next) => {
  try {
    const { partnerId, customerDetails, items, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ ok: false, message: 'Cart is empty' });
    }

    await odooService.authenticate();

    let finalPartnerId = partnerId;

    // 1. Check or Create Partner
    if (!finalPartnerId) {
      const existingPartners = await odooService.jsonRpc('/web/dataset/call_kw', {
        model: 'res.partner',
        method: 'search_read',
        args: [[['email', '=', customerDetails.email]], ['id']],
        kwargs: { limit: 1 }
      });

      if (existingPartners?.length > 0) {
        finalPartnerId = existingPartners[0].id;
        // Optional: Update address if changed
        await odooService.jsonRpc('/web/dataset/call_kw', {
          model: 'res.partner',
          method: 'write',
          args: [[finalPartnerId], {
            street: customerDetails.street,
            city: customerDetails.city,
            zip: customerDetails.zip,
            phone: customerDetails.phone,
          }],
          kwargs: {}
        });
      } else {
        const partnerValues = {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          street: customerDetails.street,
          city: customerDetails.city,
          zip: customerDetails.zip,
          customer_rank: 1,
          type: 'contact'
        };
        finalPartnerId = await odooService.jsonRpc('/web/dataset/call_kw', {
          model: 'res.partner',
          method: 'create',
          args: [partnerValues],
          kwargs: {}
        });
      }
    }

    // 2. Create Sale Order
    const orderLines = await Promise.all(items.map(async (item) => {
      const variantId = await odooService._productTemplateToVariantId(item.productTemplateId);
      return [0, 0, {
        product_id: variantId,
        product_uom_qty: item.quantity,
        price_unit: item.price
      }];
    }));

    const orderValues = {
      partner_id: finalPartnerId,
      order_line: orderLines,
      // payment_term_id could be set based on paymentMethod if needed
    };

    const orderId = await odooService.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order',
      method: 'create',
      args: [orderValues],
      kwargs: {}
    });

    // 3. Confirm if COD
    if (paymentMethod === 'cod') {
      await odooService.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order',
        method: 'action_confirm',
        args: [[orderId]],
        kwargs: {}
      });
    }

    res.json({ ok: true, orderId });
  } catch (error) {
    next(error);
  }
};
