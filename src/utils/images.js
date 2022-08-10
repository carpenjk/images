export function createUrlWithParams(url, params) {
  if (!params) return url;
  const keys = Object.keys(params);
  if (keys.length < 1) return url;
  return keys.reduce(
    (pUrl, p, i) =>
      i < 1 ? `${pUrl}${p}=${params[p]}` : `${pUrl}&${p}=${params[p]}`,
    `${url}?`
  );
}

export function getSrc(paths, params) {
  if (!params) return paths;
  const isParamsArray = Array.isArray(params);
  if (!Array.isArray(paths))
    return createUrlWithParams(paths, isParamsArray ? params[0] : params);
  return paths.map((p, i) =>
    createUrlWithParams(p, isParamsArray ? params[i] : params)
  );
}

export function getSrcSetProps(url, params) {
  return params.reduce(
    (imgProps, p) => {
      const { size, width, ...urlParams } = p;
      const { srcSet, sizes } = imgProps;
      const prevSrcset = srcSet ? `${srcSet}, ` : '';
      const _sizes = sizes ? `${sizes}, ${size}` : size;
      const sizesObj = _sizes ? { sizes: _sizes } : {};
      return {
        srcSet: `${prevSrcset}${createUrlWithParams(url, urlParams)} ${width}`,
        ...sizesObj,
      };
    },
    { srcSet: '', sizes: '' }
  );
}

// use case 1: pass single url and use array to build srcSet/sizes
// use case 2: pass url array and omit srcSetParams. Use in combination with breakpoints
// and responsive prop array.
// @param urls = [url1, url2, url3] || url1
// @param srcParams = {w: 500, h: 333, fit: 'fill'} ||
//                  [{w: 800, h: 533, fit: 'fill'}, {w: 500, h: 333, fit: 'fill'},...]
// @param srcSetParams =  [{w: 800, h: 533, fit: 'fill', width: 800w, size:'800px'}, {w: 500, h: 333, fit: 'fill', width: 500, size:'500px'},...]
//
// srcSetParams must include a width and size prop used to populate the width portion of srcset and
// the sizes property

export function createImageSrcProps({ urls, srcParams, srcSetParams }) {
  // getSrcParams
  const src = getSrc(urls, srcParams);
  const srcsetProps = srcSetParams ? getSrcSetProps(urls, srcSetParams) : {};
  return { src, ...srcsetProps };
}
