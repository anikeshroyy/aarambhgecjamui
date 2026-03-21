import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading';
import { FiArrowRight, FiCalendar, FiMapPin, FiCheckCircle, FiImage, FiEdit3, FiLayers } from 'react-icons/fi';
import principalImg from '../../assets/principal.jpg';

import gallery1 from '../../assets/gallery1.gif';
import gallery2 from '../../assets/gallery2.gif';
import gallery3 from '../../assets/gallery3.gif';
import gallery4 from '../../assets/gallery4.gif';
import gallery5 from '../../assets/gallery5.gif';
import gallery6 from '../../assets/gallery6.gif';

const AboutSection = ({ title, content, imageRight = false, imageSrc }) => {
  return (
    <div className={`flex flex-col ${imageRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 py-16 border-b border-gray-100 dark:border-dark-border last:border-0`}>
      <motion.div 
        initial={{ opacity: 0, x: imageRight ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2"
      >
        <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
          <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: imageRight ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h3>
        <div className="text-lg text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
          {content}
        </div>
      </motion.div>
    </div>
  );
};

const MessageCard = ({ name, role, message, imageSrc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-gray-50 dark:bg-dark-bg/40 p-8 rounded-3xl border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
      <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-primary/10 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
        <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{name}</h4>
        <p className="text-primary font-semibold mb-6 flex items-center justify-center md:justify-start gap-2">
          <span className="w-8 h-[2px] bg-primary/30"></span> {role}
        </p>
        <div className="relative">
          <span className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif">"</span>
          <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed relative z-10 lg:text-lg">
            {message}
          </p>
          <span className="absolute -bottom-10 -right-4 text-6xl text-primary/10 font-serif">"</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const About = () => {
  const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      
      {/* Hero Section for About */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Audience at a fest" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-4">
              About <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the history, the legacy, and the driving force behind Aarambh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="bg-white dark:bg-dark-card rounded-3xl shadow-xl overflow-hidden p-8 md:p-16 border border-gray-100 dark:border-dark-border">
          
          <SectionHeading 
            title="The Journey of Aarambh" 
            subtitle="Explore how we started and where we are heading."
            centered
          />
          
          <div className="mt-16">
            <AboutSection 
              title="Welcome to GEC Jamui"
              imageSrc="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
              content={
                <>
                  <p>
                    Government Engineering College, Jamui was established with a vision to provide quality technical education and foster innovation among young minds in Bihar. Situated in a serene environment, the campus offers an ideal setting for academic excellence and holistic development.
                  </p>
                  <p>
                    Since its inception, the college has been dedicated to creating technocrats who are not only skilled professionals but also responsible citizens capable of contributing to society's progress.
                  </p>
                </>
              }
            />

            <AboutSection 
              title="What is Aarambh?"
              imageRight={true}
              imageSrc="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
              content={
                <>
                  <p>
                    Aarambh is the annual flagship techno-cultural festival of GEC Jamui. The word "Aarambh" translates to "The Beginning"—symbolizing the start of a journey where limits are pushed, talents are discovered, and boundaries are broken.
                  </p>
                  <p>
                    It is an amalgamation of fierce technical competitions, mesmerizing cultural performances, and a celebration of the creative spirit that thrives within the students.
                  </p>
                </>
              }
            />

            <AboutSection 
              title="The Legacy: Version 1.0 & 2.0"
              imageSrc="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
              content={
                <>
                  <p>
                    The journey began with Aarambh 1.0, which set the foundation. It was a humble yet powerful start that brought the entire college together. The success was amplified in Aarambh 2.0, witnessing greater participation, bigger events, and setting a new benchmark.
                  </p>
                  <p>
                    Each edition leaves behind a trail of incredible memories, learning experiences, and stories of triumph that inspire the next batch of students to dream bigger.
                  </p>
                </>
              }
            />

            <AboutSection 
              title="Aarambh 3.0: The Ultimate Edition"
              imageRight={true}
              imageSrc="https://images.unsplash.com/photo-1540039155732-6a7144400dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
              content={
                <>
                  <p>
                    This year, we are taking it to the next level. Aarambh 3.0 promises to be larger than life, featuring an expanded roster of events, from intensive hackathons and robotics competitions to breathtaking dance offs and musical nights.
                  </p>
                  <p>
                    Join us as we write the next glorious chapter in the history of GEC Jamui. Prepare to be amazed, prepare to learn, and most importantly, prepare to have the time of your life.
                  </p>
                </>
              }
            />
          </div>

          {/* Leadership Section */}
          <div className="mt-24">
            <SectionHeading 
              title="Messages from Leadership" 
              subtitle="The visionaries guiding Aarambh to new heights."
              centered
            />
            <div className="grid grid-cols-1 gap-8 mt-16">
              <MessageCard 
                name="Dr. Aashish Kumar"
                role="Principal, GEC Jamui"
                imageSrc={principalImg}
                message="Aarambh 3.0 is a testament to the creativity and technical prowess of our students. It's more than just a fest; it's a platform where innovation meets culture. We invite you to experience this journey of excellence and witness the beginning of something extraordinary."
              />
            </div>
          </div>

          {/* Glimpses Section */}
          <div className="mt-24">
            <SectionHeading 
              title="Glimpses of Aarambh 2.0" 
              subtitle="Relive the most memorable moments from our previous edition."
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pb-16 border-b border-gray-100 dark:border-dark-border">
              {galleryImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg aspect-video cursor-pointer"
                >
                  <img src={img} alt={`Glimpse ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">Aarambh 2.0 Highlight</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Who built this section */}
          <div className="mt-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto p-12 rounded-[40px] bg-gradient-to-br from-gray-900 to-dark-bg text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-black mb-6">Who built this?</h3>
                <p className="text-gray-400 font-light mb-10 text-lg leading-relaxed">
                  The digital ecosystem of Aarambh 3.0 was designed and engineered with passion to provide a seamless transition for every participant and guest.
                </p>
                <Link 
                  to="/developers" 
                  className="inline-flex items-center gap-3 px-10 py-5 bg-primary hover:bg-yellow-500 text-white font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-primary/20"
                >
                  Meet the Developer
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Ready for Aarambh Card */}
          <div className="mt-24">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-primary/5 dark:bg-primary/5 rounded-[40px] border border-primary/20 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12"
            >
              <div className="text-center lg:text-left flex-1">
                <h2 className="text-4xl md:text-5xl font-display font-black text-gray-900 dark:text-white mb-6 italic">Ready for <span className="text-primary italic">Aarambh?</span></h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light mb-0 leading-relaxed max-w-xl">
                  The stage is set, the lights are ready. Join us in this spectacular journey of innovation and culture!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
                <div className="flex items-center gap-4 bg-white dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm w-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><FiMapPin className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Day 1 & 2</h4>
                    <p className="font-bold text-gray-900 dark:text-white">Main Auditorium</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white dark:bg-dark-card p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm w-full">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500"><FiCheckCircle className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Entry Fee</h4>
                    <p className="font-bold text-gray-900 dark:text-white">Free for Students</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Discover More Grid */}
          <div className="mt-24">
            <SectionHeading 
              title="Discover More" 
              subtitle="Navigate through the various facets of the Aarambh fest."
              centered
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { title: 'Explore Events', subtitle: 'Technical, Cultural, Sports', icon: <FiLayers />, link: '/events', color: 'blue' },
                { title: 'Event Schedule', subtitle: 'Timing & Day Itinerary', icon: <FiCalendar />, link: '/schedule', color: 'purple' },
                { title: 'Register Now', subtitle: 'Join the Competition', icon: <FiEdit3 />, link: '/events', color: 'green' },
                { title: 'Photo Gallery', subtitle: 'Memorable Moments', icon: <FiImage />, link: '/gallery', color: 'primary' },
              ].map((card, idx) => (
                <Link key={idx} to={card.link}>
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-[32px] bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-lg group hover:border-primary/30 transition-all text-center h-full flex flex-col items-center justify-center"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 mb-6 group-hover:scale-110 group-hover:bg-${card.color}-500 group-hover:text-white transition-all duration-300`}>
                      {card.icon}
                    </div>
                    <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{card.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light">{card.subtitle}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
