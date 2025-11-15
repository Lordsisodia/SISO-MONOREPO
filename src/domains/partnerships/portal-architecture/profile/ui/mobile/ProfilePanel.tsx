import { mockTierProgress } from './profile-fixtures';

export function ProfilePanel() {
  return (
    <section className='flex flex-1 flex-col gap-4 px-4 py-6'>
      <header className='flex items-center gap-3'>
        <div className='h-14 w-14 rounded-full bg-siso-bg-tertiary' />
        <div>
          <h2 className='text-lg font-semibold text-siso-text-primary'>SISOagency</h2>
          <p className='text-xs text-siso-text-muted'>Power Level 18 · Login Streak 1/14 days</p>
        </div>
      </header>
      <article className='rounded-3xl border border-siso-border bg-siso-bg-secondary p-4'>
        <header className='mb-2 flex items-center justify-between text-sm text-siso-text-muted'>
          <span>Tier Progress</span>
          <span>{mockTierProgress.tier}</span>
        </header>
        <div className='h-2 w-full rounded-full bg-siso-bg-hover'>
          <div className='h-2 rounded-full bg-siso-orange' style={{ width: `${mockTierProgress.progress * 100}%` }} />
        </div>
        <ul className='mt-3 space-y-1 text-xs text-siso-text-muted'>
          {mockTierProgress.perks.map((perk) => (
            <li key={perk}>• {perk}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
