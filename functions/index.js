const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// Configure email transporter for Gmail
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});

// Cloud Function to send order emails
exports.sendOrderEmails = functions.https.onCall(async (data, context) => {
    // Check if user is authenticated (optional - remove if you want guests to order too)
    // if (!context.auth) {
    //     throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    // }

    const { orderId, orderData, customerEmail, customerName } = data;

    // Validate required data
    if (!orderId || !orderData || !customerName) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required order data');
    }

    try {
        // Email to admin (YOU)
        const adminEmail = {
            from: 'Italia Charms italiacharmshop@gmail.com',
            to: 'italiacharmshop@gmail.com', // CHANGE THIS TO YOUR ACTUAL EMAIL
            subject: `🎉 New Order Received - Order #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #d6336c;">New Order Received! 🎉</h2>
                    
                    <div style="background: #fff0f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="color: #d6336c;">Order Details</h3>
                        <p><strong>Order ID:</strong> ${orderId}</p>
                        <p><strong>Customer:</strong> ${customerName}</p>
                        <p><strong>Email:</strong> ${customerEmail || 'Not provided'}</p>
                        <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                        <p><strong>Address:</strong> ${orderData.customer.address}, ${orderData.customer.governorate}</p>
                        <p><strong>Total:</strong> ${orderData.total} JOD</p>
                        <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                        <p><strong>User ID:</strong> ${orderData.userId || 'Guest'}</p>
                    </div>

                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <h4 style="color: #d6336c;">Items Ordered:</h4>
                        ${orderData.items.map((item, index) => `
                            <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
                                <p><strong>${item.product}</strong> (${item.size}) - ${item.price} JOD</p>
                                <p>Material: ${item.materialType} | Full Glam: ${item.isFullGlam ? 'Yes' : 'No'}</p>
                                <p>Charms: ${item.charms.length} charms</p>
                            </div>
                        `).join('')}
                    </div>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #d6336c;">
                        <p><strong>Subtotal:</strong> ${orderData.subtotal} JOD</p>
                        <p><strong>Delivery Fee:</strong> ${orderData.deliveryFee} JOD</p>
                        <p><strong>Total Amount:</strong> ${orderData.total} JOD</p>
                    </div>

                    <div style="margin-top: 20px; text-align: center;">
                        <a href="https://console.firebase.google.com/project/${process.env.GCLOUD_PROJECT}/firestore/data/~2Forders~2F${orderId}" 
                           style="background: #d6336c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                           View in Firebase Console
                        </a>
                    </div>
                </div>
            `
        };

        // Send admin email
        await transporter.sendMail(adminEmail);
        console.log('Admin notification email sent');

        // Email to customer (only if they provided email)
        if (customerEmail) {
            const customerEmailHtml = {
                from: 'Italia Charms italiacharmshop@gmail.com',
                to: customerEmail,
                subject: `🎀 Your Italia Charms Order Confirmation - #${orderId}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #d6336c; text-align: center;">Thank you for your order! 💖</h2>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <p>We're excited to create your beautiful jewelry piece!</p>
                        </div>

                        <div style="background: #fff0f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h3 style="color: #d6336c;">Order Summary</h3>
                            <p><strong>Order ID:</strong> ${orderId}</p>
                            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${orderData.total} JOD</p>
                            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                            <p><strong>Delivery Address:</strong> ${orderData.customer.address}, ${orderData.customer.governorate}</p>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <h4 style="color: #d6336c;">Your Items:</h4>
                            ${orderData.items.map((item, index) => `
                                <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px;">
                                    <p><strong>${item.product}</strong> (${item.size})</p>
                                    <p>Material: ${item.materialType}</p>
                                    <p>Price: ${item.price} JOD</p>
                                </div>
                            `).join('')}
                        </div>

                        <div style="margin-top: 20px; padding: 15px; background: #e8f5e8; border-radius: 8px;">
                            <h4 style="color: #2e7d32;">What's Next?</h4>
                            <p>✓ Order received and confirmed</p>
                            <p>✓ We'll start crafting your jewelry</p>
                            <p>✓ You'll receive updates on your order status</p>
                            <p>✓ Expected delivery: 3-5 business days</p>
                        </div>

                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                            <p>Need help? Contact us:</p>
                            <p>📱 WhatsApp: <a href="https://wa.me/962788838118">0788838118</a></p>
                            <p>📸 Instagram: <a href="https://instagram.com/italiacharms.jo">@italiacharms.jo</a></p>
                        </div>

                        <div style="text-align: center; margin-top: 20px; color: #666;">
                            <p>Thank you for choosing Italia Charms! 🎀</p>
                        </div>
                    </div>
                `
            };

            await transporter.sendMail(customerEmailHtml);
            console.log('Customer confirmation email sent');
        }

        return { 
            success: true, 
            message: customerEmail ? 'Both emails sent successfully' : 'Admin email sent (no customer email provided)' 
        };

    } catch (error) {
        console.error('Error sending emails:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send email notifications: ' + error.message);
    }
});
