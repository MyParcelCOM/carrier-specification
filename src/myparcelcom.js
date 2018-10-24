(function () {
  function cancelEvent (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // prevent swagger.json injection
  if (window.location.search.indexOf('url=') !== -1) {
    window.location.search = ''
  }

  document.title = 'Carrier API Specification | MyParcel.com'

  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  document.addEventListener('DOMContentLoaded', function () {
    // wait for the swagger.json to be processed
    const swaggerInterval = setInterval(function () {
      const baseUrl = document.getElementsByClassName('base-url')[0]
      if ('undefined' !== typeof baseUrl) {
        clearInterval(swaggerInterval)

        // fix json link timestamp param
        const swaggerlink = baseUrl.nextSibling
        swaggerlink.innerHTML = swaggerlink.innerText.split('?d=')[0]

        // move description
        const description = document.getElementsByClassName('description')[0]
        description.classList.add('wrapper')
        baseUrl.parentNode.insertBefore(description, baseUrl)

        // inject logo
        const title = document.getElementsByClassName('title')[0]
        title.innerHTML = title.innerHTML.replace('MyParcel.com', '<img src="https://cdn.myparcel.com/images/myparcelcom-black.svg" alt="MyParcel.com">')

        // version link
        const version = document.querySelector('.version')
        version.innerHTML = 'Version ' + version.innerText.trim()
        const versionLink = document.createElement('a')
        versionLink.href = 'https://github.com/MyParcelCOM/carrier-specification/releases'
        versionLink.target = '_blank'
        version.parentNode.insertBefore(versionLink, version)
        versionLink.appendChild(version)

        // base url link
        baseUrl.remove()

        // make nice
        document.getElementsByClassName('information-container')[0].classList.remove('wrapper')

        // move info elements
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')
        description.parentNode.insertBefore(wrapper, description.nextSibling)
        const strong = document.createElement('strong')
        strong.innerHTML = 'JSON: '
        wrapper.appendChild(strong)
        wrapper.appendChild(swaggerlink)

        // disable main endpoint accordeons
        const accordeons = document.querySelectorAll('.opblock-tag, section.models h4')
        for (let i = 0; i < accordeons.length; i++) {
          accordeons[i].addEventListener('click', cancelEvent)
        }
      }
    }, 137)
  })
})()
