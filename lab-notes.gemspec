# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "lab-notes"
  spec.version       = "0.1.0"
  spec.authors       = ["Marek Rewers, U.S. Department of State, GPA/LAB"]
  spec.email         = ["mrewers@users.noreply.github.com"]

  spec.summary       = "A documentation theme for GitHub Pages."
  spec.homepage      = "https://github.com/iip-design"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.7"
  spec.add_runtime_dependency "jekyll-inline-svg", "~>0.0.2"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
