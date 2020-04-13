module.exports = {

  // Usage: {% svgSprite name="globe" %}
  svgSprite:  (svgSprite) => {
    return `<svg class="icon icon--${svgSprite.name}" role="img" aria-hidden="true">
              <use xlink:href="/assets/svg/sprite.svg#${svgSprite.name}"></use>
            </svg>`;
  }
}
