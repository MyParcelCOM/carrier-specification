(function () {
  // Redoc options: https://github.com/Redocly/redoc#redoc-options-object
  Redoc.init(
    'dist/swagger.json',
    {
      disableSearch: true,
      expandSingleSchemaField: true,
      hideDownloadButton: true,
      hideSingleRequestSampleTab: true,
      jsonSampleExpandLevel: 'all',
      lazyRendering: true,
      nativeScrollbars: true,
      theme: {
        colors: {
          primary: {
            main: '#3a2efe'
          },
          success: {
            main: '#4caf50'
          },
          warning: {
            main: '#fb8c00'
          },
          error: {
            main: '#ff5252'
          },
          text: {
            primary: '#080c0c'
          },
          responses: {
            info: {
              color: '#2196f3'
            }
          },
          http: {
            get: '#4caf50',
            post: '#2196f3',
            patch: '#fb8c00',
            delete: '#ff5252'
          },
        },
        typography: {
          fontSize: '16px',
          headings: {
            fontFamily: 'Gilroy, helvetica neue, sans-serif'
          },
          links: {
            visited: '#3a2efe',
            hover: '#3a2efe'
          }
        },
        sidebar: {
          width: '300px',
          backgroundColor: '#fafafa'
        },
        logo: {
          gutter: '20px 0'
        },
        rightPanel: {
          backgroundColor: '#080c0c'
        },
        codeBlock: {
          backgroundColor: '#202323'
        },
      }
    },
    document.getElementById('redoc'),
    function () {
      requestAnimationFrame(function () {
        // Open external links in a new tab.
        const links = document.querySelectorAll('.api-content a')

        for (let l = 0; l < links.length; l++) {
          if (links[l].href.substring(0, 4) === 'http' && links[l].hostname !== window.location.hostname) {
            links[l].target = '_blank'
          }
        }

        // Fix ReDoc bug https://github.com/Redocly/redoc/issues/1238
        // 1. Find all POST examples
        document.querySelectorAll('[id$="post"] h3').forEach(function (element) {
          // 2. Filter on Request examples
          if (element.innerText.includes('Request samples')) {
            // 3. Find all properties
            element.nextSibling.querySelectorAll('.property.token.string').forEach(function (element) {
              // 4. Find the "attributes" property
              if (element.innerText.includes('"attributes"')) {
                // 5. Find the preceding "id" property
                const id = element.parentNode.parentNode.previousSibling
                if (id.innerText.includes('"id"')) {
                  // 6. Hide it, this filter makes sure we do not hide "id" properties of RPC endpoints or relationships
                  id.style.display = 'none'
                }
              }
            })
            // 7. Hide the copy button, because this still copies a POST example including the "id".
            const copyButton = element.nextSibling.querySelector('button')
            if (copyButton) {
              copyButton.style.display = 'none'
            }
          }
        })
      })
    }
  )
})()
