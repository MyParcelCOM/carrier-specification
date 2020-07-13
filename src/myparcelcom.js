(function () {
  // Redoc options: https://github.com/Redocly/redoc#redoc-options-object
  Redoc.init(
    'dist/swagger.json',
    {
      expandSingleSchemaField: true,
      hideDownloadButton: true,
      jsonSampleExpandLevel: 'all',
      lazyRendering: true
    },
    document.getElementById('redoc'),
    function () {
      requestAnimationFrame(function () {
        // Open external links in a new tab.
        var links = document.querySelectorAll('.api-content a')

        for (var l = 0; l < links.length; l++) {
          if (links[l].href.substr(0, 4) === 'http' && links[l].hostname !== window.location.hostname) {
            links[l].target = '_blank'
          }
        }
      })
    }
  )
})()
