# Elite Medical Distributions

Brochure website for **[elitemedicaldistributions.com.au](https://elitemedicaldistributions.com.au)**  
Pages: **Home**, **About**, **Contact**

## Brand

| Token | Hex | Name |
|-------|-----|------|
| Timberwolf | `#DAD7CD` | Light background accent |
| Sage | `#A3B18A` | Soft green |
| Reseda | `#5C7650` | Primary buttons / links |
| Hunter | `#3A5A40` | Mid green |
| Brunswick | `#344E41` | Dark / header bars |

Logo: `assets/emd-logo.png`

## Local preview

Open `index.html` in a browser, or:

```bash
npx serve .
```

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import this GitHub repository
3. Framework preset: **Other** (static HTML)
4. Click **Deploy**

Production site: https://www.elitemedicaldistributions.com.au/

### Custom domain (after deploy)

1. Vercel → Project → **Settings** → **Domains**
2. Add `elitemedicaldistributions.com.au` and `www.elitemedicaldistributions.com.au`
3. At your DNS provider, set the records Vercel displays (typical values below)

| Type | Name / Host | Value | TTL |
|------|-------------|-------|-----|
| **A** | `@` | `76.76.21.21` | 600 / default |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 / default |

**Important:** Do **not** delete or change **MX** records (email). Only change web **A** / **CNAME** for the site.

DNS can take minutes to a few hours. Vercel will show a green check when the domain is valid.

### Routes

Clean URLs: `/` · `/about` · `/contact` (favicon at `/assets/favicon.svg`)

## Contact form

Default: opens the visitor’s email client (`mailto`).

For inbox delivery without leaving the site, set the form `action` in `contact.html` to a [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) endpoint.
