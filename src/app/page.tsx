import { SectionAbout } from '@/components/section-about';
import { SectionContact } from '@/components/section-contact';
import { SectionImpressions } from '@/components/section-impressions';
import { SectionMap } from '@/components/section-map';
import { SectionMembers } from '@/components/section-members';
import { SectionPricing } from '@/components/section-pricing';
import { SectionRules } from '@/components/section-rules';
import { SectionTitle } from '@/components/section-title';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  return (
    <>
      <div>
        <section id="home" className="flex bg-primary">
          <div className="flex grow">
            <SectionTitle />
          </div>
        </section>

        <section id="about" className="flex bg-secondary py-5">
          <div className="flex grow">
            <SectionAbout />
          </div>
        </section>

        <section id="lidmaatschap" className="flex bg-secondary py-5">
          <div className="flex grow">
            <SectionPricing />
          </div>
        </section>

        <section id="impressions" className="flex">
          <div className="flex grow">
            <SectionImpressions />
          </div>
        </section>

        <section id="leden" className="flex bg-secondary py-5">
          <div className="flex grow">
            <SectionMembers />
          </div>
        </section>

        <section id="map" className="flex bg-secondary">
          <div className="flex grow">
            <SectionMap />
          </div>
        </section>

        <section id="reglement" className="flex bg-secondary py-5">
          <div className="flex grow">
            <SectionRules />
          </div>
        </section>

        <section id="contact" className="flex bg-secondary py-5">
          <div className="flex grow">
            <SectionContact />
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
