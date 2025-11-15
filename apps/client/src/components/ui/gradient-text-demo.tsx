import { GradientText } from "@/components/ui/gradient-text"

/**
 * GradientText Component Demo
 *
 * Showcases various usage examples of the GradientText component
 * with SISO brand colors and different configurations.
 */

export function GradientTextDemo() {
  return (
    <div className="space-y-12 p-8 bg-siso-bg min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <GradientText
            colors={["#FF5722", "#FFA726", "#FF5722"]}
            animationSpeed={5}
            className="text-5xl font-bold"
          >
            GradientText Component
          </GradientText>
          <p className="text-lg text-siso-text-muted">
            Beautiful animated gradient text with SISO brand colors
          </p>
        </div>

        {/* Basic Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Basic Usage</h2>
          <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border">
            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-3xl font-semibold"
            >
              SISO Brand Gradient
            </GradientText>
          </div>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-300">{`<GradientText
  colors={["#FF5722", "#FFA726", "#FF5722"]}
  animationSpeed={5}
  className="text-3xl font-semibold"
>
  SISO Brand Gradient
</GradientText>`}</code>
          </pre>
        </section>

        {/* With Border Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">With Animated Border</h2>
          <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border flex justify-center">
            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              showBorder
              animationSpeed={4}
              className="text-2xl font-medium px-4 py-2"
            >
              Gradient with Border
            </GradientText>
          </div>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-300">{`<GradientText
  colors={["#FF5722", "#FFA726", "#FF5722"]}
  showBorder
  animationSpeed={4}
  className="text-2xl font-medium px-4 py-2"
>
  Gradient with Border
</GradientText>`}</code>
          </pre>
        </section>

        {/* Custom Colors Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Custom Color Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Blue to Purple */}
            <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                className="text-2xl font-semibold"
              >
                Blue to Green
              </GradientText>
            </div>

            {/* Pink to Blue */}
            <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
              <GradientText
                colors={["#ff40aa", "#40aaff", "#ff40aa"]}
                animationSpeed={3}
                className="text-2xl font-semibold"
              >
                Pink to Blue
              </GradientText>
            </div>
          </div>
          <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-gray-300">{`// Blue to Green
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  className="text-2xl font-semibold"
>
  Blue to Green
</GradientText>

// Pink to Blue
<GradientText
  colors={["#ff40aa", "#40aaff", "#ff40aa"]}
  animationSpeed={3}
  className="text-2xl font-semibold"
>
  Pink to Blue
</GradientText>`}</code>
          </pre>
        </section>

        {/* Animation Speed Variations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Animation Speed Variations</h2>
          <div className="space-y-4">
            {/* Fast Animation */}
            <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={2}
                className="text-2xl font-semibold"
              >
                Fast Animation (2s)
              </GradientText>
            </div>

            {/* Medium Animation */}
            <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={5}
                className="text-2xl font-semibold"
              >
                Medium Animation (5s)
              </GradientText>
            </div>

            {/* Slow Animation */}
            <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={10}
                className="text-2xl font-semibold"
              >
                Slow Animation (10s)
              </GradientText>
            </div>
          </div>
        </section>

        {/* Size Variations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Size Variations</h2>
          <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border space-y-6">
            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-xl font-semibold"
            >
              Small (text-xl)
            </GradientText>

            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-2xl font-semibold"
            >
              Medium (text-2xl)
            </GradientText>

            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-4xl font-semibold"
            >
              Large (text-4xl)
            </GradientText>

            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-6xl font-bold"
            >
              Extra Large
            </GradientText>
          </div>
        </section>

        {/* Portfolio Page Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Portfolio Page Examples</h2>
          <div className="space-y-6">
            {/* Hero Title */}
            <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border text-center">
              <p className="text-sm text-siso-text-muted mb-4">Hero Title</p>
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={5}
                className="text-4xl sm:text-5xl md:text-6xl font-bold"
              >
                Our Work
              </GradientText>
            </div>

            {/* Section Title */}
            <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border text-center">
              <p className="text-sm text-siso-text-muted mb-4">Section Title</p>
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={5}
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
              >
                Featured Projects
              </GradientText>
            </div>

            {/* CTA Title */}
            <div className="bg-siso-bg-alt p-8 rounded-lg border border-siso-border text-center">
              <p className="text-sm text-siso-text-muted mb-4">CTA Title</p>
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={5}
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
              >
                Earn 30% Commission
              </GradientText>
            </div>
          </div>
        </section>

        {/* Props Documentation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Component Props</h2>
          <div className="bg-siso-bg-alt p-6 rounded-lg border border-siso-border">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-siso-border">
                  <th className="py-2 text-white font-semibold">Prop</th>
                  <th className="py-2 text-white font-semibold">Type</th>
                  <th className="py-2 text-white font-semibold">Default</th>
                  <th className="py-2 text-white font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-siso-text">
                <tr className="border-b border-siso-border/50">
                  <td className="py-3 font-mono text-sm text-siso-orange">colors</td>
                  <td className="py-3 text-sm">string[]</td>
                  <td className="py-3 text-sm font-mono">["#ffaa40", "#9c40ff", "#ffaa40"]</td>
                  <td className="py-3 text-sm">Array of color hex codes for the gradient</td>
                </tr>
                <tr className="border-b border-siso-border/50">
                  <td className="py-3 font-mono text-sm text-siso-orange">animationSpeed</td>
                  <td className="py-3 text-sm">number</td>
                  <td className="py-3 text-sm">8</td>
                  <td className="py-3 text-sm">Animation duration in seconds</td>
                </tr>
                <tr className="border-b border-siso-border/50">
                  <td className="py-3 font-mono text-sm text-siso-orange">showBorder</td>
                  <td className="py-3 text-sm">boolean</td>
                  <td className="py-3 text-sm">false</td>
                  <td className="py-3 text-sm">Show animated gradient border</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono text-sm text-siso-orange">className</td>
                  <td className="py-3 text-sm">string</td>
                  <td className="py-3 text-sm">-</td>
                  <td className="py-3 text-sm">Additional Tailwind CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GradientTextDemo
