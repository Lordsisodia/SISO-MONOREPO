import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/clerk-react';

/**
 * Clerk Webhook Handler for User Sync
 *
 * This webhook syncs Clerk users to Supabase database
 *
 * Setup in Clerk Dashboard:
 * 1. Go to Webhooks → Add Endpoint
 * 2. URL: https://your-domain.com/api/webhooks/clerk
 * 3. Events: user.created, user.updated, user.deleted
 * 4. Copy the signing secret to CLERK_WEBHOOK_SECRET env var
 */

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error('Missing CLERK_WEBHOOK_SECRET in environment variables');
}

export async function POST(req: Request) {
  // Get headers and body
  const headerPayload = req.headers;
  const payload = await req.json();

  // Get Svix headers for verification
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  // Verify webhook signature
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(JSON.stringify(payload), {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }

  // Handle the webhook event
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Sync to Supabase
    // Note: You'll need to import and use the Supabase admin client here
    // import { supabaseAdmin } from '@/lib/supabase-admin';
    //
    // const { error } = await supabaseAdmin.from('partners').insert({
    //   clerk_user_id: id,
    //   email: email_addresses[0]?.email_address,
    //   first_name,
    //   last_name,
    //   avatar_url: image_url,
    // });

    console.log('User created:', id);
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Update in Supabase
    // const { error } = await supabaseAdmin
    //   .from('partners')
    //   .update({
    //     email: email_addresses[0]?.email_address,
    //     first_name,
    //     last_name,
    //     avatar_url: image_url,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq('clerk_user_id', id);

    console.log('User updated:', id);
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    // Soft delete or remove from Supabase
    // const { error } = await supabaseAdmin
    //   .from('partners')
    //   .delete()
    //   .eq('clerk_user_id', id);

    console.log('User deleted:', id);
  }

  return new Response('Webhook processed', { status: 200 });
}
