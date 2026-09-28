import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Before Rt. Hon. Egbedun reconstructed the Okuku-Ijabe link road, our farm trucks used to sink in mud during the harvest rains. Today, it takes less than 15 minutes to transport our produce to the central market. He delivered on his word.',
      name: 'Chief Oladimeji Adeyemi',
      role: 'Agro-Allied Farmer & Community Elder',
      community: 'Ijabe Community, Odo-Otin'
    },
    {
      quote:
        'The new modern maternity clinic in Inisa with 24-hour solar electricity has saved many expectant mothers from life-threatening emergencies. We prayed for a representative who remembers the grassroots, and Speaker Egbedun answered us.',
      name: 'Mrs. Folake Ogunwale',
      role: 'Market Women Association (Iyaloja)',
      community: 'Inisa Central, Odo-Otin'
    },
    {
      quote:
        'I participated in the 2024 Tech Empowerment Bootcamp in Okuku and received a high-performance laptop and mentorship. Now I work remotely for international clients from right here in Osun State. He gives youth real wings.',
      name: 'Kehinde Oyewole',
      role: 'Software Engineer & Youth Leader',
      community: 'Okuku, Odo-Otin'
    }
  ];

  return (
    <section className="py-8 sm:py-10 bg-stone-900 text-white border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center mb-6">
          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
            Voices of Odo-Otin
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
            Constituents on the Impact of Speaker Egbedun
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-2">
            Real testimonies from royal elders, market women, farmers, and young entrepreneurs across our 16 communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-800/70 p-6 rounded-xl border border-stone-700/80 flex flex-col justify-between relative shadow-sm"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-400/40 mb-3" />
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-700/60">
                <div className="font-bold text-sm text-amber-400 font-display">
                  {item.name}
                </div>
                <div className="text-xs text-stone-300 font-medium">
                  {item.role}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  {item.community}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
