import { Webhook } from 'svix';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the Svix headers for verification
  const svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' });
  }

  // Get the body
  const payload = JSON.stringify(req.body);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ error: 'Webhook verification failed' });
  }

  // Handle the webhook
  const eventType = evt.type;

  try {
    switch (eventType) {
      case 'user.created':
      case 'user.updated': {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data;

        const { data, error } = await supabase.rpc('sync_clerk_user', {
          clerk_id: id,
          user_email: email_addresses[0]?.email_address,
          user_first_name: first_name,
          user_last_name: last_name,
          user_image_url: image_url,
          user_clerk_data: evt.data
        });

        if (error) {
          console.error('Error syncing user:', error);
          return res.status(500).json({ error: 'Failed to sync user' });
        }

        console.log(`User ${eventType === 'user.created' ? 'created' : 'updated'}:`, id);
        break;
      }

      case 'user.deleted': {
        const { id } = evt.data;

        const { error } = await supabase.rpc('delete_clerk_user', {
          clerk_id: id
        });

        if (error) {
          console.error('Error deleting user:', error);
          return res.status(500).json({ error: 'Failed to delete user' });
        }

        console.log('User deleted:', id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
