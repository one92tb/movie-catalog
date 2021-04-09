/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
export type ValidationResult = {
  condition: boolean,
  link : string,
  platform: string,
}

const validateDetails = (url: string):ValidationResult[] => [{
  condition: (/(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature=player_embedded\x26v=)?([a-zA-Z0-9_-]{11})+/gm).test(url),
  link: url.replace(/(.+?)(\/)(watch\x3Fv=)?(embed\/watch\x3Ffeature=player_embedded\x26v=)?/gm, ''),
  platform: 'youtube',
},
{
  condition: url.length === 11,
  link: url,
  platform: 'youtube',
},
{
  condition: /(http|https)?:\/\/(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/.test(url),
  link: url.replace(/(http|https)?(?:channels\/(?:\w+\/)|groups\/([^/]*))/, ''),
  platform: 'vimeo',
},
{
  condition: /^\d{9}$/.test(url),
  link: `https://vimeo.com/${url}`,
  platform: 'vimeo',
},
{
  condition: true,
  link: '',
  platform: 'unknown',
}];

export default validateDetails;
