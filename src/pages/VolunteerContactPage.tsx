import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { AccordBadge } from '../components/common/AccordBadge';
import { ODO_OTIN_COMMUNITIES, OdoOtinCommunity, VolunteerSubmission } from '../types';
import {
  HeartHandshake,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Printer,
  Sparkles,
  ArrowRight,
  Shield,
  Send,
  Download
} from 'lucide-react';

export const VolunteerContactPage: React.FC = () => {
  const { addVolunteer, addContactMessage, settings, showToast } = useCampaign();

  // Volunteer form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [ageRange, setAgeRange] = useState<VolunteerSubmission['ageRange']>('25-34');
  const [gender, setGender] = useState<VolunteerSubmission['gender']>('Male');
  const [community, setCommunity] = useState<OdoOtinCommunity>('Okuku');
  const [ward, setWard] = useState('Ward 01');
  const [pollingUnit, setPollingUnit] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Door-to-door campaign',
    'Youth mobilization'
  ]);
  const [availability, setAvailability] = useState<VolunteerSubmission['availability']>('Weekends');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Digital marketing']);
  const [whySupport, setWhySupport] = useState('');
  const [priorExperience, setPriorExperience] = useState(true);
  const [referredBy, setReferredBy] = useState('');
  const [consentContact, setConsentContact] = useState(true);
  const [consentUpdates, setConsentUpdates] = useState(true);

  // Success pledge card state
  const [submittedVolunteer, setSubmittedVolunteer] = useState<VolunteerSubmission | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTown, setContactTown] = useState<OdoOtinCommunity | 'Other'>('Okuku');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const volunteerActivitiesList = [
    'Door-to-door campaign',
    'Social media advocacy',
    'Event organization',
    'Fundraising',
    'Voter registration drive',
    'Polling unit agent',
    'Youth mobilization',
    'Women group coordination'
  ];

  const volunteerSkillsList = [
    'Public speaking',
    'Digital marketing',
    'Graphics design',
    'Video production',
    'Writing',
    'Transportation (own vehicle)',
    'Community leadership'
  ];

  const handleActivityToggle = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentContact) {
      showToast('Please check the consent box to proceed.', 'error');
      return;
    }
    const newVol = addVolunteer({
      fullName,
      phone,
      email,
      whatsapp: whatsapp || phone,
      ageRange,
      gender,
      community,
      ward,
      pollingUnit,
      activities: selectedActivities,
      availability,
      skills: selectedSkills,
      whySupport,
      priorExperience,
      referredBy,
      consentContact,
      consentUpdates
    });
    setSubmittedVolunteer(newVol);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      showToast('Please fill out required contact fields.', 'error');
      return;
    }
    addContactMessage({
      fullName: contactName,
      email: contactEmail,
      phone: contactPhone,
      community: contactTown,
      subject: contactSubject || 'Constituency Inquiry',
      message: contactMessage
    });
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactSubject('');
    setContactMessage('');
  };

  const printVolunteerCard = () => {
    window.print();
  };

  return (
    <div className="py-12 lg:py-16 bg-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-stone-200 pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <AccordBadge size="md" />
            <span className="text-xs font-semibold text-stone-500">
              Grassroots Mobilization & Inquiries
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 tracking-tight font-display">
            Join Our Campaign & Contact Secretariat
          </h1>
          <p className="text-base text-stone-600 mt-2 max-w-3xl">
            Lend your voice, skills, and energy to the re-election vanguard of Rt. Hon. Adewale Egbedun. 
            Register as an accredited campaign volunteer or reach out directly to our central secretariat.
          </p>
        </div>

        {/* Generated Volunteer Pledge Card Display (if submitted) */}
        {submittedVolunteer && (
          <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-amber-50 border-2 border-amber-400 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-300 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-amber-400 text-stone-950 font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-950 font-display">
                    Volunteer Registration Confirmed!
                  </h3>
                  <p className="text-xs text-stone-600">
                    Welcome to the Odo-Otin 2027 Mobilization Vanguard. Here is your official Supporter Card:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={printVolunteerCard}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Volunteer Card</span>
                </button>
                <button
                  onClick={() => setSubmittedVolunteer(null)}
                  className="px-3 py-2 bg-amber-200 hover:bg-amber-300 text-stone-900 rounded-lg text-xs font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Printable Volunteer Credential Badge */}
            <div className="max-w-md mx-auto bg-stone-900 text-white rounded-xl p-6 border-2 border-amber-400 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    OFFICIAL SUPPORTER CREDENTIAL
                  </div>
                  <div className="text-base font-bold font-display text-white">
                    Rt. Hon. Adewale Egbedun Campaign
                  </div>
                </div>
                <AccordBadge size="sm" />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px]">Volunteer Name:</span>
                  <div className="font-bold text-amber-300 text-sm">{submittedVolunteer.fullName}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-stone-400 text-[10px]">Community:</span>
                    <div className="font-semibold text-white">{submittedVolunteer.community}</div>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px]">Ward / Polling Unit:</span>
                    <div className="font-semibold text-white">{submittedVolunteer.ward}</div>
                  </div>
                </div>
                <div className="pt-1">
                  <span className="text-stone-400 text-[10px]">Assigned Vanguard Roles:</span>
                  <div className="text-[11px] text-stone-300">
                    {submittedVolunteer.activities.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                <span>Accreditation ID: {submittedVolunteer.id}</span>
                <span className="text-amber-400 font-bold">Odo-Otin 2027</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid: Volunteer Registration Form (Left) & Secretariat Info + Message Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Volunteer Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Recruitment Portal
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-950 font-display mt-0.5">
                  Official Campaign Volunteer Form
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Please complete the details below to be assigned to your ward campaign committee.
                </p>
              </div>

              <form onSubmit={handleVolunteerSubmit} className="space-y-6 text-xs">
                
                {/* 1. Personal Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                    1. Personal Information
                  </h3>
                  
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Engr. Babatunde Oloyede"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+234 803 123 4567"
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Same as phone or custom"
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Age Range
                      </label>
                      <select
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value as any)}
                        className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600"
                      >
                        <option value="18-24">18 - 24 years</option>
                        <option value="25-34">25 - 34 years</option>
                        <option value="35-49">35 - 49 years</option>
                        <option value="50-64">50 - 64 years</option>
                        <option value="65+">65+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3 py-2.5 min-h-[44px] rounded-xl bg-white border border-stone-300 text-stone-900 text-base sm:text-xs focus:outline-hidden focus:border-emerald-600"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. Location Information (All 16 Communities) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                    2. Constituency Location
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Town / Community *
                      </label>
                      <select
                        value={community}
                        onChange={(e) => setCommunity(e.target.value as OdoOtinCommunity)}
                        required
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                      >
                        {ODO_OTIN_COMMUNITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Ward
                      </label>
                      <input
                        type="text"
                        value={ward}
                        onChange={(e) => setWard(e.target.value)}
                        placeholder="e.g. Ward 02 (Inisa North)"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Polling Unit (if known)
                      </label>
                      <input
                        type="text"
                        value={pollingUnit}
                        onChange={(e) => setPollingUnit(e.target.value)}
                        placeholder="e.g. PU 004, St. Paul's School"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Volunteer Preferences & Availability */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                    3. How Would You Like to Help?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {volunteerActivitiesList.map((act) => (
                      <label
                        key={act}
                        className="flex items-center gap-2 p-2 rounded-lg bg-white border border-stone-200 hover:bg-amber-50/50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedActivities.includes(act)}
                          onChange={() => handleActivityToggle(act)}
                          className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                        />
                        <span className="text-stone-800 font-medium">{act}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Availability *
                      </label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Evenings only">Evenings only</option>
                        <option value="Full-time until election">Full-time until February 2027</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">
                        Prior Campaign Experience?
                      </label>
                      <div className="flex items-center gap-4 mt-2">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="priorExp"
                            checked={priorExperience}
                            onChange={() => setPriorExperience(true)}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="radio"
                            name="priorExp"
                            checked={!priorExperience}
                            onChange={() => setPriorExperience(false)}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Skills & Expertise (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {volunteerSkillsList.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            type="button"
                            key={skill}
                            onClick={() => handleSkillToggle(skill)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'bg-white border border-stone-200 text-stone-600'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 4. Why Support & Consent */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider pb-1 border-b border-stone-200">
                    4. Reason for Supporting & Consent
                  </h3>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Why do you want to support Rt. Hon. Adewale Egbedun?
                    </label>
                    <textarea
                      rows={2}
                      value={whySupport}
                      onChange={(e) => setWhySupport(e.target.value)}
                      placeholder="Share what inspires you about his stewardship as Speaker and representative..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-2 pt-2 text-stone-700">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentContact}
                        onChange={(e) => setConsentContact(e.target.checked)}
                        required
                        className="w-4 h-4 text-amber-500 rounded mt-0.5"
                      />
                      <span>I consent to being contacted by the campaign secretariat for volunteer coordination. *</span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consentUpdates}
                        onChange={(e) => setConsentUpdates(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded mt-0.5"
                      />
                      <span>I agree to receive official campaign updates via WhatsApp, SMS, and Email.</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Submit Registration & Generate Pledge Card</span>
                </button>
              </form>
            </div>
          </div>

          {/* Campaign Office Information & General Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Office Information Box */}
            <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 shadow-xl space-y-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Official Campaign Secretariat
              </span>
              <h2 className="text-xl font-bold font-display text-white">
                Adewale Egbedun Campaign Organization
              </h2>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{settings.campaignOfficeAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${settings.phoneHotline}`} className="hover:text-white transition-colors">
                    {settings.phoneHotline}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`mailto:${settings.emailAddress}`} className="hover:text-white transition-colors">
                    {settings.emailAddress}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Monday – Saturday: 8:00 AM – 6:00 PM</span>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Campaign%20Team%2C%20I%20want%20to%20support%20Rt.%20Hon.%20Egbedun.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Campaign Hot-Desk</span>
                </a>
              </div>
            </div>

            {/* General Inquiry / Message Form */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Direct Line to the Secretariat
                </span>
                <h3 className="text-base font-bold text-stone-900 font-display mt-0.5">
                  Send a Message or Project Request
                </h3>
                <p className="text-xs text-stone-500">
                  Constituent inquiries are reviewed directly by the Member&apos;s communications bureau.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="e.g. Alhaji Mustapha Inisa"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Community</label>
                    <select
                      value={contactTown}
                      onChange={(e) => setContactTown(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                    >
                      {ODO_OTIN_COMMUNITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="Other">Other / Diaspora</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Community borehole request / Endorsement"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Message *</label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    placeholder="Write your note to Rt. Hon. Egbedun's office..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-900 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
