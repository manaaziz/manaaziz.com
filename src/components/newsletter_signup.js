// Public embedded-form URL recovered from the original Manalogue signup.
// This contains audience identifiers, not an API key.
const originalAction = "https://manaaziz.us21.list-manage.com/subscribe/post?u=25b1fe3cff9957c2ee50518fa&id=645f232449&f_id=00d1cde1f0";
const action = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_URL?.trim() || originalAction;
const endpoint = new URL(action);
const audience = endpoint.searchParams.get("id");
const account = endpoint.searchParams.get("u");

if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".list-manage.com") ||
    endpoint.pathname !== "/subscribe/post" || !audience || !account) {
  throw new Error("NEXT_PUBLIC_NEWSLETTER_FORM_URL must be a Mailchimp HTTPS embedded signup form action with u and id parameters.");
}

export default function NewsletterSignup() {
  return (
    <form action={action} className="newsletter-form ph-no-capture" data-provider="mailchimp" method="post">
      <label className="sr-only" htmlFor="newsletter-email">Email address</label>
      <input
        id="newsletter-email"
        name="EMAIL"
        placeholder="mana@example.com"
        autoComplete="email"
        autoCapitalize="none"
        spellCheck={false}
        required
        type="email"
      />
      <div className="newsletter-honeypot" aria-hidden="true">
        <input type="text" name={`b_${account}_${audience}`} tabIndex={-1} defaultValue="" autoComplete="off" />
      </div>
      <button aria-label="Join newsletter" type="submit">
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
