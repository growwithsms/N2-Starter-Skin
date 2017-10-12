# N2 Starter Skin Overview
The purpose of this skin is to allow for easy, responsive theme development on the N2 eCommerce platform.

## Starter Skin Features
+ Completely Responsive (Forms, Product Grids, Tables, Etc..)
+ Mobile "Off-Canvas" Navigation
+ FontAwesome icons built-in
+ Built with SASS for faster development

[View Live Preview](http://realizen2.mycartssl.com/store/index.cfm)

# Getting Started Guide

## Editing Styles
All of your project styles should be added to the appropriate SASS file in the `/SCSS/` folder. Use your favorite CSS preprocessor client (such as prepros, koala, codekit, etc..) to output the design.scss file to design.css. Your design.css file should be minified and autoprefixed.

## Editing Templates/HTML
All of the available template files can be found in the `/inc/` folder. If you cannot make the edits you need you will need to use JavaScript to edit the DOM. See "N2 Hacks" in `/js/global.js` ¯\_(ツ)_/¯

## Skin Installation
To use this skin, rename the folder to your desired name (typically the client's name) and move the renamed folder to `www2/assets/design/` on the server. Once complete, you will then be able to select the skin in the client's N2 portal. Customize to your hearts content!
