/*
  # Add admin user

  1. Changes
    - Create admin user with specified credentials
    - Set admin role in user metadata
    - Add identity with proper provider_id
*/

-- Create admin user if it doesn't exist
DO $$
DECLARE
  admin_uid UUID;
BEGIN
  -- Insert the user into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'nikhil05966@gmail.com',
    crypt('Nikhil@05966', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"role":"admin"}'::jsonb,
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'nikhil05966@gmail.com'
  )
  RETURNING id INTO admin_uid;

  -- Update existing user if found
  IF admin_uid IS NULL THEN
    UPDATE auth.users
    SET
      encrypted_password = crypt('Nikhil@05966', gen_salt('bf')),
      raw_user_meta_data = '{"role":"admin"}'::jsonb,
      updated_at = NOW()
    WHERE email = 'nikhil05966@gmail.com'
    RETURNING id INTO admin_uid;
  END IF;

  -- Insert into auth.identities if not exists
  IF admin_uid IS NOT NULL THEN
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    )
    SELECT
      gen_random_uuid(),
      admin_uid,
      format('{"sub":"%s","email":"%s"}', admin_uid::text, 'nikhil05966@gmail.com')::jsonb,
      'email',
      'nikhil05966@gmail.com',
      NOW(),
      NOW(),
      NOW()
    WHERE NOT EXISTS (
      SELECT 1 FROM auth.identities 
      WHERE user_id = admin_uid AND provider = 'email'
    );
  END IF;
END $$;