import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="w-full min-h-[400px] px-4 sm:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 border-green-500 border rounded-full px-4 py-2 text-white text-sm">
              <Heart className="w-4 h-4 text-green-500" />
              <span>We&apos;d Love to Hear From You</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Get in Touch with <span className="text-green-500">Swift</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you have questions, feedback, or just want to share your
              experience, we&apos;re here to listen and help make your gifting
              journey even better.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Send us a Message
              </h2>
              <p className="text-muted-foreground">
                Share your thoughts, complaints, or suggestions. We&apos;ll
                respond as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Your first name"
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Your last name"
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 resize-none"
                />
              </div>

              <Button className="bg-green-500 text-black px-8 py-3 text-base rounded-full font-semibold hover:bg-green-600 w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>

          {/* Brand Details & Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                About Swift
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Swift is more than just a delivery service—we&apos;re your
                  bridge to loved ones across the globe. Founded with the belief
                  that distance shouldn&apos;t diminish the joy of giving,
                  we&apos;ve been connecting hearts through thoughtful gifts for
                  over a decade.
                </p>
                <p>
                  Our mission is simple: to make international gifting as easy
                  and reliable as sending a letter. With 200+ countries in our
                  network and a commitment to excellence, we ensure that every
                  package arrives with the same care and attention you&apos;d
                  give yourself.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Our Values</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">Authenticity</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Real connections through genuine care
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">Reliability</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your trust is our foundation
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">Global Reach</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connecting the world, one gift at a time
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-500" />
                    <span className="font-semibold">Excellence</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every detail matters to us
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">
                      hello@swiftgifts.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-SWIFT</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      123 Connection Street
                      <br />
                      Global City, GC 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-semibold">Support Hours</p>
                    <p className="text-muted-foreground">
                      24/7 for urgent matters
                      <br />
                      Mon-Fri 9AM-6PM for general inquiries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
