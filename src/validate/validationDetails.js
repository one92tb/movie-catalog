const validateDetails = (url) => [{
  condition: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(url),
  link: url,
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
}];

export default validateDetails;
