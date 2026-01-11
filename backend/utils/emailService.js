const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOrderConfirmation = async (user, order, items) => {
  try {
    const itemsHtml = items.map(item => `<li>${item.product.name} - ₹${item.price} x ${item.quantity}</li>`).join('');
    const itemsText = items.map(item => `- ${item.product.name} (₹${item.price} x ${item.quantity})`).join('\n');

    const mailOptions = {
      from: `"Zen Store" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Order Confirmation – Your Order is Successful',
      text: `Hello ${user.name},\n\nYour order has been placed successfully! 🎉\n\nOrder ID: ${order._id}\nOrder Date: ${new Date(order.createdAt).toLocaleString()}\n\nItems:\n${itemsText}\n\nTotal Amount: ₹${order.total}\n\nThank you for shopping with us.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #6366f1;">Hello ${user.name},</h2>
          <p>Your order has been placed successfully! 🎉</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <h3>Items Ordered:</h3>
            <ul>
              ${itemsHtml}
            </ul>
            <p style="font-size: 18px; font-weight: bold;">Total Amount: ₹${order.total}</p>
          </div>
          <p>Thank you for shopping with us at <strong>Zen Store</strong>.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw error to avoid blocking the order process
  }
};
