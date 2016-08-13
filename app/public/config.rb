# require 'compass/import-once/activate'
# Require any additional compass plugins here.
# require "plugin name"

# make sure the file style.css.map (sourcemap) is genrated for chrome/firefox developter tools to read scss
sourcemap = true

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "/"
sass_dir = "/sass"
images_dir = "/images"
javascripts_dir = "/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

environment = :development

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true
 
# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false
 
 
# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
# - See more at: http://www.newthinktank.com/2015/04/sass-video-tutorial/#sthash.TLvrYLOv.dpuf