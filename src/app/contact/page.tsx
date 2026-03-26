import ContactForm from '@/components/contact/ContactForm';
import { getPageBySlug } from '@/lib/api';

export default async function ContactPage() {
  const page = await getPageBySlug('contact');
  const formId = process.env.NEXT_PUBLIC_CF7_ID || "1"; // Default to 5 if not provided

  return (
    <div className="pb-32">
      <header className="py-24 bg-white/5 border-b border-white/5 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-xs mb-6 block">Ready to start?</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
            Get in <span className="underline decoration-primary decoration-8 underline-offset-8">Touch</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-muted text-lg">
            Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">📍</div>
                <div>
                  <p className="text-white font-bold leading-none mb-1">Our Location</p>
                  <p className="text-muted text-sm">123 Design Way, Tech City, 94103</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">📧</div>
                <div>
                  <p className="text-white font-bold leading-none mb-1">Email Us</p>
                  <p className="text-muted text-sm">hello@headlesscms.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary">📞</div>
                <div>
                  <p className="text-white font-bold leading-none mb-1">Call Anytime</p>
                  <p className="text-muted text-sm">+1 (555) 000-HEADLESS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[32px] border border-white/5">
            <h4 className="text-white font-bold mb-4 text-lg">Weekly Insights</h4>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">Join 5,000+ developers getting our weekly tips on headless architecture and dynamic UI design.</p>
            <input type="email" placeholder="Enter your email" className="w-full bg-white/10 border border-white/5 rounded-xl px-4 py-3 text-white text-sm mb-4 focus:outline-none" />
            <button className="w-full bg-white text-background font-black py-4 rounded-xl text-sm hover:bg-white/90">Newsletter →</button>
          </div>
        </div>

        {/* Main Contact Form */}
        <div className="lg:col-span-8">
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
            <ContactForm formId={formId} />
          </div>
        </div>
      </div>
    </div>
  );
}
