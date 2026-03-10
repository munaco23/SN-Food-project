const odooService = require('../services/odooService');

exports.getAccountData = async (req, res) => {
  try {
    const { partnerId } = req.params;
    if (!partnerId) {
      return res.status(400).json({ ok: false, message: 'Partner ID is required' });
    }

    const [partner, orders] = await Promise.all([
      odooService.getPartner(partnerId),
      odooService.getPartnerOrders(partnerId)
    ]);

    if (!partner) {
      return res.status(404).json({ ok: false, message: 'Partner not found' });
    }

    res.json({
      ok: true,
      partner,
      orders
    });
  } catch (error) {
    console.error('Error fetching account data:', error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { name, phone } = req.body;

    if (!partnerId) {
      return res.status(400).json({ ok: false, message: 'Partner ID is required' });
    }

    const result = await odooService.updatePartner(partnerId, { name, phone });
    
    if (result) {
      res.json({ ok: true, message: 'Profile updated successfully' });
    } else {
      res.status(400).json({ ok: false, message: 'Update failed' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ ok: false, message: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { street, street2, city, zip, country_id } = req.body;

    if (!partnerId) {
      return res.status(400).json({ ok: false, message: 'Partner ID is required' });
    }

    const values = { street, street2, city, zip };
    if (country_id) values.country_id = country_id;

    const result = await odooService.updatePartner(partnerId, values);
    
    if (result) {
      res.json({ ok: true, message: 'Address updated successfully' });
    } else {
      res.status(400).json({ ok: false, message: 'Update failed' });
    }
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ ok: false, message: error.message });
  }
};
