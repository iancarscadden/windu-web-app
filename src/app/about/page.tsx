import Background from "../../components/Background";
import Link from "next/link";

export default function About() {
  return (
    <Background>
      <div className="min-h-screen">
        <nav className="px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-white/30 dark:bg-black/20 sticky top-0 z-10">
          <div className="font-bold text-xl">Windu</div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link href="/background-demo" className="hover:text-blue-600 transition-colors font-medium">Demo</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors font-medium">About</Link>
            <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">Contact</Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">About Windu</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                At Windu, we're revolutionizing the way businesses interact with artificial intelligence. 
                Our mission is to make AI accessible, practical, and transformative for organizations of all sizes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed">
                Founded in 2023, Windu emerged from a simple yet powerful idea: that AI should be as 
                natural to use as having a conversation with a colleague. Our team of experts combines 
                decades of experience in AI, machine learning, and enterprise software to create 
                solutions that feel intuitive and deliver real value.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-4">
                <li><span className="font-semibold">Innovation:</span> We constantly push the boundaries of what's possible with AI</li>
                <li><span className="font-semibold">Accessibility:</span> We make complex technology simple and usable for everyone</li>
                <li><span className="font-semibold">Transparency:</span> We believe in being open about how our AI works</li>
                <li><span className="font-semibold">Impact:</span> We measure our success by the value we create for our users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
              <p className="text-lg leading-relaxed">
                We leverage cutting-edge AI models and technologies to create solutions that are both 
                powerful and practical. Our platform is built on robust, scalable architecture that 
                ensures reliability and performance.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Background>
  );
} 