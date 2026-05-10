'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { AnimatedText } from '@/components/motion/AnimatedText';
import { IconBrain, IconRocket, IconBrandWhatsapp, IconCheck, IconPointFilled } from '@tabler/icons-react';

function NeuralNetwork() {
  const [mounted, setMounted] = useState(false);
  const [randomDelays, setRandomDelays] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    setRandomDelays(Array.from({ length: 12 }).map(() => Math.random() * 2));
  }, []);

  if (!mounted) return <div className="w-80 h-80 md:w-[450px] md:h-[450px]" />;

  return (
    <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 md:w-72 md:h-72 bg-indigo-500/20 rounded-full blur-[60px]"
      />
      
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-indigo-500/10 rounded-full"
          style={{ padding: `${i * 30}px` }}
        />
      ))}

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 4 + (randomDelays[i] || 0), 
            repeat: Infinity, 
            delay: i * 0.3 
          }}
          className="absolute"
          style={{
            top: `${50 + Math.sin(i * (360/12) * Math.PI / 180) * 45}%`,
            left: `${50 + Math.cos(i * (360/12) * Math.PI / 180) * 45}%`,
          }}
        >
          <IconPointFilled size={12} className="text-indigo-400" />
        </motion.div>
      ))}

      <div className="relative z-10 p-10 md:p-14 rounded-[3rem] bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]">
        <IconBrain size={70} className="text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.8)]" />
      </div>
    </div>
  );
}

function ChatSimulator({ progress }: { progress: any }) {
  const messages = [
    { from: 'client', text: 'Hola, ¿tienen disponibilidad para mañana?' },
    { from: 'albi', text: '¡Hola! 👋 Sí, tenemos espacio. ¿A qué hora te gustaría?' },
    { from: 'client', text: 'A las 4pm, somos 2 personas' },
    { from: 'albi', text: 'Perfecto, reserva confirmada. ¡Te esperamos!' },
  ];

  return (
    <div className="w-full max-w-sm md:max-w-[420px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0B141A] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col scale-100">
      <div className="bg-[#1F2C34] px-6 py-5 flex items-center gap-4 border-b border-white/5">
        <div className="relative w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center font-display italic font-black text-white text-lg">
          A
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1F2C34] rounded-full" />
        </div>
        <div>
          <p className="text-white text-[15px] font-bold">Albi · Asistente IA</p>
          <p className="text-emerald-400 text-[11px] font-medium tracking-widest uppercase italic">En línea</p>
        </div>
      </div>

      <div className="p-7 space-y-5 min-h-[380px] bg-[#0B141A]">
        {messages.map((msg, i) => {
          const start = 0.36 + (i * 0.04);
          const mOpacity = useTransform(progress, [start, start + 0.02], [0, 1]);
          const mScale = useTransform(progress, [start, start + 0.02], [0.85, 1]);
          const mY = useTransform(progress, [start, start + 0.02], [15, 0]);

          return (
            <motion.div 
              key={i} 
              style={{ opacity: mOpacity, scale: mScale, y: mY }}
              className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-[13px] leading-relaxed font-sans shadow-xl ${
                msg.from === 'client' 
                  ? 'bg-[#005C4B] text-white rounded-tr-none' 
                  : 'bg-[#1F2C34] text-white/95 rounded-tl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          );
        })}

        <motion.div 
          style={{ opacity: useTransform(progress, [0.33, 0.35, 0.58, 0.62], [0, 1, 1, 0]) }}
          className="flex justify-start"
        >
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-5 py-2.5 rounded-full flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-400 rounded-full" />
            </div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] italic">Albi analizando...</span>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#1F2C34] p-4 flex items-center gap-3">
        <div className="flex-1 h-10 bg-[#2A3942] rounded-full border border-white/5" />
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
          <IconBrandWhatsapp size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export function DayChatbot() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // RESTORING CINEMATIC TUNNEL EFFECT
  // Phase 1: 0 to 0.3
  // Phase 2: 0.33 to 0.63
  // Phase 3: 0.66 to 1.0

  // Phase 1: Neural Birth
  const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [1, 1, 1, 0]);
  const text1Typewriter = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const text1Y = useTransform(smoothProgress, [0.25, 0.3], [0, -50]);
  const img1Scale = useTransform(smoothProgress, [0, 0.3, 0.33], [1, 1.4, 1.6]);
  const img1Opacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const img1Blur = useTransform(smoothProgress, [0.25, 0.3], [0, 8]);

  // Phase 2: AI Interaction
  const text2Opacity = useTransform(smoothProgress, [0.31, 0.36, 0.6, 0.64], [0, 1, 1, 0]);
  const text2Typewriter = useTransform(smoothProgress, [0.33, 0.45], [0, 1]);
  const text2Y = useTransform(smoothProgress, [0.31, 0.36, 0.6, 0.64], [50, 0, 0, -50]);
  const img2Scale = useTransform(smoothProgress, [0.25, 0.33, 0.55, 0.64], [0.6, 1, 1, 1.4]);
  const img2Opacity = useTransform(smoothProgress, [0.28, 0.33, 0.58, 0.64], [0, 1, 1, 0]);
  const img2Blur = useTransform(smoothProgress, [0.58, 0.64], [0, 8]);

  // Phase 3: Delivery
  const text3Opacity = useTransform(smoothProgress, [0.64, 0.7, 0.9, 1], [0, 1, 1, 0]);
  const text3Typewriter = useTransform(smoothProgress, [0.66, 0.78], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.64, 0.7, 0.9, 1], [50, 0, 0, -50]);
  const img3Scale = useTransform(smoothProgress, [0.55, 0.66, 0.85, 1], [0.6, 1, 1, 1.4]);
  const img3Opacity = useTransform(smoothProgress, [0.62, 0.66, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="day-6-chatbot" className="relative h-[400vh] bg-[#050505]">
      
      <div className="sticky top-0 w-full pt-10 md:pt-20 z-50 pointer-events-none flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Día 6-7 · Neural Sync & Entrega</span>
        </div>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative h-[250px] flex flex-col justify-center">
            {/* Text 1 */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text1Opacity, y: text1Y }}>
              <AnimatedText customProgress={text1Typewriter} text="Sincronía Neural." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Entrenamos a Albi con tu tono de marca para que actúe como tu mejor empleado 24/7.
              </p>
              <div className="mt-8 flex items-center gap-3 text-indigo-400">
                <IconBrain size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Inteligencia Autónoma</span>
              </div>
            </motion.div>

            {/* Text 2 */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text2Opacity, y: text2Y }}>
              <AnimatedText customProgress={text2Typewriter} text="Ventas 24/7." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Gestión de flujos de WhatsApp y agendamiento automático mientras te enfocas en operar.
              </p>
              <div className="mt-8 flex items-center gap-3 text-emerald-400">
                <IconBrandWhatsapp size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">WhatsApp Automation</span>
              </div>
            </motion.div>

            {/* Text 3 */}
            <motion.div className="absolute left-0 right-0" style={{ opacity: text3Opacity, y: text3Y }}>
              <AnimatedText customProgress={text3Typewriter} text="Las Llaves del Imperio." className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#FAFAF7] tracking-tight mb-4" />
              <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-sm font-light italic">
                Día 7. Tu ecosistema digital está listo para escalar tu negocio al siguiente nivel.
              </p>
              <div className="mt-8 flex items-center gap-3 text-blue-400">
                <IconRocket size={24} />
                <span className="text-[11px] font-bold tracking-[0.3em] uppercase">Entrega Final</span>
              </div>
            </motion.div>
          </div>

          <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
            {/* Visual 1 */}
            <motion.div 
              className="absolute w-full flex items-center justify-center" 
              style={{ 
                scale: img1Scale, 
                opacity: img1Opacity, 
                filter: useMotionTemplate`blur(${img1Blur}px)`,
                zIndex: 10 
              }}
            >
              <NeuralNetwork />
            </motion.div>

            {/* Visual 2 */}
            <motion.div 
              className="absolute w-full flex items-center justify-center" 
              style={{ 
                scale: img2Scale, 
                opacity: img2Opacity, 
                filter: useMotionTemplate`blur(${img2Blur}px)`,
                zIndex: 20 
              }}
            >
              <ChatSimulator progress={smoothProgress} />
            </motion.div>

            {/* Visual 3 */}
            <motion.div 
              className="absolute w-full max-w-md" 
              style={{ 
                scale: img3Scale, 
                opacity: img3Opacity, 
                zIndex: 30 
              }}
            >
              <div className="rounded-[3rem] overflow-hidden border border-white/10 bg-[#050505] aspect-[4/3.5] flex flex-col p-10 font-display relative shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-10">
                    <h4 className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-black">Ecosistema Albatros</h4>
                    <span className="text-blue-400 text-[10px] bg-blue-400/10 px-3 py-1.5 rounded-lg font-black tracking-widest uppercase italic border border-blue-400/20">ACTIVO</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner">
                      <p className="text-[10px] text-white/30 uppercase mb-2 font-black tracking-widest">Performance</p>
                      <p className="text-4xl text-white font-black tracking-tighter">99/100</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner">
                      <p className="text-[10px] text-white/30 uppercase mb-2 font-black tracking-widest">AI Accuracy</p>
                      <p className="text-4xl text-white font-black tracking-tighter">96.8%</p>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-10 shadow-inner">
                    <motion.div className="h-full bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.8)]" initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 2 }} />
                  </div>
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-lg">
                      <IconCheck size={24} strokeWidth={3} />
                    </div>
                    <p className="text-lg font-bold tracking-tight italic">Sistema listo para producción.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
