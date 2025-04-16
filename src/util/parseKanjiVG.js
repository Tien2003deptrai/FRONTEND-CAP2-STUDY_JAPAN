export async function parseKanjiVG(svgText) {
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
    const paths = Array.from(svgDoc.querySelectorAll('path'))

    return paths.map((p) => p.getAttribute('d') || '').filter(Boolean)
}
