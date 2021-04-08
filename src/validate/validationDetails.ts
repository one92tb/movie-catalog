export type ValidationResult = {
  condition: boolean,
  link: string,
  platform: string,
}

const validateDetails = (url: string):ValidationResult[] => [{
  // eslint-disable-next-line max-len
  condition: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(url),
  link: url.slice(url.length - 11),
  platform: 'youtube',
},
{
  condition: url.length === 11,
  link: url,
  platform: 'youtube',
},
{
  condition: /^(http:\/\/|https:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(url),
  link: url,
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
