"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  ChevronRight,
  Cpu,
  LineChart,
  Shield,
  Star,
  Target,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Menu,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatItemProps {
  value: string
  label: string
  icon: LucideIcon
}

const StatItem = ({ value, label, icon: Icon }: StatItemProps) => (
  <div className="flex flex-col items-center space-y-2 border-t pt-6">
    <div className="rounded-full bg-secondary-100 p-2 mb-1">
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-600" />
    </div>
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-700">{value}</span>
    <span className="text-base sm:text-lg text-gray-600 text-center">{label}</span>
  </div>
)

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => (
  <Card className={cn("border-none shadow-md hover:shadow-lg transition-shadow", className)}>
    <CardHeader className="pb-2">
      <div className="p-3 w-fit rounded-lg bg-secondary-100 mb-2">
        <Icon className="h-6 w-6 text-secondary-600" />
      </div>
      <CardTitle className="text-xl text-primary-900">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
)

interface TestimonialProps {
  name: string
  role: string
  content: string
  rating?: number
}

const Testimonial = ({ name, role, content, rating = 5 }: TestimonialProps) => (
  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-secondary-100 p-3">
          <Users className="h-6 w-6 text-secondary-600" />
        </div>
        <div>
          <CardTitle className="text-lg text-primary-900">{name}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
      </div>
      <div className="flex mt-2">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <Star key={i} className="h-4 w-4 text-accent-500 fill-accent-500" />
          ))}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 italic">"{content}"</p>
    </CardContent>
  </Card>
)

interface BrandCardProps {
  title: string
  description: string
  color: string
  icon?: LucideIcon
  image?: string
}

const BrandCard = ({ title, description, color, icon: Icon, image }: BrandCardProps) => (
  <Card className={`h-full border-none shadow-md hover:shadow-lg transition-shadow ${color}`}>
    <CardHeader className="pb-2">
      {image ? (
        <div className="p-3 w-fit rounded-lg bg-white/20 mb-2">
          <Image src={image || "/placeholder.svg"} alt={title} width={48} height={48} className="rounded-lg" />
        </div>
      ) : (
        Icon && (
          <div className="p-3 w-fit rounded-lg bg-white/20 mb-2">
            <Icon className="h-6 w-6 text-white" />
          </div>
        )
      )}
      <CardTitle className="text-xl text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-white/90">{description}</p>
    </CardContent>
    <CardFooter>
      <Link href="#learn-more" className="text-white flex items-center text-sm">
        Know more <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </CardFooter>
  </Card>
)

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-bold text-primary-800">SURYADHI</span>
              <div className="w-3 h-3 bg-accent-400 rounded-full mb-3"></div>
            </div>
            <span className="text-xs tracking-widest text-gray-500 -mt-1">LEARNING</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-secondary-600">Home</Link>
            <Link href="#about" className="text-sm font-medium text-gray-500 hover:text-primary-700">About us</Link>
            <Link href="#nep" className="text-sm font-medium text-gray-500 hover:text-primary-700">NEP 2024</Link>
            <Link href="#services" className="text-sm font-medium text-gray-500 hover:text-primary-700">Services</Link>
            <Link href="#brands" className="text-sm font-medium text-gray-500 hover:text-primary-700">Our Brands</Link>
            <Link href="#director" className="text-sm font-medium text-gray-500 hover:text-primary-700">Director's Desk</Link>
            <Link href="#career" className="text-sm font-medium text-gray-500 hover:text-primary-700">Career</Link>
            <Link href="#partner" className="text-sm font-medium text-gray-500 hover:text-primary-700">Become a Partner</Link>
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-secondary-300 text-secondary-700 hover:bg-secondary-50">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">Sign up</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
            {[
              { href: "/", label: "Home" },
              { href: "#about", label: "About us" },
              { href: "#nep", label: "NEP 2024" },
              { href: "#services", label: "Services" },
              { href: "#brands", label: "Our Brands" },
              { href: "#director", label: "Director's Desk" },
              { href: "#career", label: "Career" },
              { href: "#partner", label: "Become a Partner" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-primary-700 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t">
              <Link href="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full border-secondary-300 text-secondary-700">Log in</Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-gradient-to-r from-primary-600 to-primary-700">Sign up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col space-y-6">
              <Badge className="w-fit bg-secondary-100 text-secondary-700 hover:bg-secondary-200 px-3 py-1 text-sm">
                Educational Excellence
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-primary-900">
                Empowering Schools for Success: Your Partner in{" "}
                <span className="text-secondary-600">Educational Academic Solutions</span>
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Enhancing Education Through Comprehensive Services. Join our growing network of educational institutions
                and be part of shaping the future of education in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#learn-more" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-accent-300 text-accent-700 hover:bg-accent-50">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-secondary-200">
                    <div className="w-full h-32 bg-gradient-to-br from-secondary-500 to-secondary-600 flex flex-col items-center justify-center text-white">
                      <BookOpen className="h-8 w-8 mb-1" />
                      <span className="text-xs font-bold text-center px-2">Suryadhi Preschool</span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-accent-200">
                    <div className="w-full h-32 bg-gradient-to-br from-accent-500 to-accent-600 flex flex-col items-center justify-center text-white">
                      <Building2 className="h-8 w-8 mb-1" />
                      <span className="text-xs font-bold text-center px-2">Suryadhi World Preschool</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-primary-200">
                    <div className="w-full h-32 bg-gradient-to-br from-primary-500 to-primary-600 flex flex-col items-center justify-center text-white">
                      <Brain className="h-8 w-8 mb-1" />
                      <span className="text-xs font-bold text-center px-2">Suryadhi Global School</span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-green-200">
                    <div className="w-full h-32 bg-gradient-to-br from-green-500 to-green-600 flex flex-col items-center justify-center text-white">
                      <Users className="h-8 w-8 mb-1" />
                      <span className="text-xs font-bold text-center px-2">Suryadhi Learning</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-400 rounded-full flex items-center justify-center text-white font-bold">
                <div className="text-center">
                  <div className="text-sm">Be</div>
                  <div>Suryadhi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20">
            <StatItem value="25+" label="Years of Experience" icon={Clock} />
            <StatItem value="500+" label="Students Enrolled" icon={Users} />
            <StatItem value="10+" label="Schools by 2025" icon={Building2} />
            <StatItem value="95%" label="Success Rate" icon={Target} />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-secondary-100 text-secondary-700 hover:bg-secondary-200 px-3 py-1 text-sm">
              OUR BRANDS
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-primary-900">
              Explore Excellence: Our Educational Brands
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Our educational brands are designed to cater to different learning needs while maintaining our core values
              of excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BrandCard
              title="Suryadhi Preschool"
              description="A chain of Premium Global Pre Schools with international standards and modern teaching methodologies."
              color="bg-gradient-to-br from-secondary-500 to-secondary-600"
              icon={BookOpen}
            />
            <BrandCard
              title="Suryadhi World Preschool"
              description="A Pre School of International Standards that acts as feeders to our CBSE & ICSE schools."
              color="bg-gradient-to-br from-accent-500 to-accent-600"
              icon={Building2}
            />
            <BrandCard
              title="Suryadhi Global School"
              description="A chain of CBSE and ICSE schools with Global Approach and Integrated Curriculum."
              color="bg-gradient-to-br from-primary-500 to-primary-600"
              icon={Brain}
            />
            <BrandCard
              title="Suryadhi Learning"
              description="Comprehensive training programs for educators and educational management solutions."
              color="bg-gradient-to-br from-green-500 to-green-600"
              icon={Users}
            />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="w-full py-12 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative h-[260px] sm:h-[360px] lg:h-[400px] w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-secondary-100 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KYAj1gpJCO75Za0MxFyKwiezSx5kL2.png"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="w-fit bg-pink-100 text-pink-600 hover:bg-pink-200 px-3 py-1 text-sm">WHO ARE WE?</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl text-primary-900">
                We are an education management company promoting preschools, K12 schools and Teachers Training across
                India.
              </h2>
              <p className="text-gray-600">
                Suryadhi Learning Pvt. Ltd. (SLPL) is a forward-thinking initiative established in 2023 by seasoned
                education professionals with over 25 years of experience in K12 schooling across India.
              </p>
              <p className="text-gray-600">
                Founded by Prof. Suresh Bachhav and Mrs. Sushma Bachhav, the visionaries behind New Vision School, SLPL
                aims to provide integrated and holistic education to every Indian student through our network of brands.
              </p>
              <div className="bg-secondary-50 p-4 rounded-lg border-l-4 border-secondary-500">
                <p className="font-medium text-primary-800">
                  Suryadhi Learning introduces 'LEAFP': a unique pedagogy, ensuring an exceptional learning experience
                  for Indian students.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="group border-secondary-300 text-secondary-700 hover:bg-secondary-50"
                >
                  Read More <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 bg-secondary-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-secondary-100 text-secondary-700 hover:bg-secondary-200 px-3 py-1 text-sm">
              WHAT WE DO?
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-900">
              Empowering Education Through <br />
              Comprehensive Management Solutions for Academic Excellence
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Our suite of services is designed to support educational institutions at every level, from curriculum
              development to administrative efficiency across India
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={Brain}
              title="Student-Centric Educational Support"
              description="Our academic support features include detailed academic planning, teacher collaboration, and efficient resource management tailored for Indian education system."
            />
            <FeatureCard
              icon={Cpu}
              title="Reliable Technology Support Services"
              description="We provide technical support to schools, upgrading existing technology to meet evolving needs and implementing digital learning solutions."
            />
            <FeatureCard
              icon={Building2}
              title="Streamlined Administrative Solution"
              description="Our comprehensive administrative services provide support for Recruitment, Payroll, School structure, Partner and vendor management."
            />
            <FeatureCard
              icon={Shield}
              title="Assessment Solutions"
              description="We utilize multiple intelligence theories to frame our assessments, ensuring that every learner's needs are met with personalized evaluation methods."
            />
            <FeatureCard
              icon={BookOpen}
              title="Teacher Development Programs"
              description="We provide year-round training and support for teachers to enhance their classroom management skills and teaching methodologies."
            />
            <FeatureCard
              icon={LineChart}
              title="Tailored Marketing Solutions"
              description="Our innovative strategies help maximize participation and build brand equity through diverse activities and strategic partnerships."
            />
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Curriculum Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our expert team develops comprehensive curricula aligned with Indian national and international
                  standards while incorporating innovative teaching methodologies.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>CBSE Aligned</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>ICSE Compatible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>NEP 2024 Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Global Standards</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="border-secondary-300 text-secondary-700 hover:bg-secondary-50">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">School Management System</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Our comprehensive ERP system streamlines all aspects of school management, from admissions to alumni
                  relations, designed specifically for Indian educational institutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Admissions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Fee Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Staff Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Report Generation</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
                    Access ERP
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 px-3 py-1 text-sm">TESTIMONIALS</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl text-primary-900">
              What Our Partners Say
            </h2>
            <p className="max-w-[800px] text-gray-600 md:text-lg">
              Hear from educational institutions across India that have transformed their operations with Suryadhi
              Learning
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Testimonial
              name="Rajesh Kumar"
              role="Franchise Owner, Delhi"
              content="Partnering with Suryadhi Learning was the best decision for my educational venture. The comprehensive support system and proven curriculum have helped us achieve remarkable growth in just two years."
              rating={5}
            />
            <Testimonial
              name="Priya Sharma"
              role="School Director, Mumbai"
              content="The technology integration and administrative solutions provided by Suryadhi have streamlined our operations significantly. Our teachers can now focus more on teaching rather than paperwork."
              rating={5}
            />
            <Testimonial
              name="Anand Patel"
              role="Franchise Partner, Bangalore"
              content="The marketing support and brand recognition that comes with the Suryadhi name has helped us establish quickly in a competitive market. The ongoing training ensures we stay ahead of educational trends."
              rating={4}
            />
          </div>

          <div className="mt-12 bg-gradient-to-r from-secondary-50 to-primary-50 p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-primary-700 mb-2">98%</div>
                <p className="text-gray-600">Partner satisfaction rate</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-primary-700 mb-2">45+</div>
                <p className="text-gray-600">Educational partners nationwide</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold text-primary-700 mb-2">15+</div>
                <p className="text-gray-600">Years average partnership length</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Education in India?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Join our network of educational institutions and be part of the future of learning in India.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Get Started Today
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-primary-700">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-primary-900">
        <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-white">SURYADHI</span>
                  <div className="w-3 h-3 bg-accent-400 rounded-full mb-3"></div>
                </div>
                <span className="text-xs tracking-widest text-gray-400">LEARNING</span>
              </div>
              <p className="text-gray-400">
                Transforming education across India through innovative solutions and comprehensive support.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Our Brands</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Suryadhi Preschool
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Suryadhi World Preschool
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Suryadhi Global School
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Suryadhi Learning
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Our Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pre-School Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    K12 Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Teacher Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    School Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Educational Consulting
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">Mumbai, Maharashtra, India</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">info@suryadhilearning.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <span className="text-gray-400">Monday - Saturday: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Suryadhi Learning Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
