import he from 'he';

const HtmlDecoder = ({ html }: { html: string, exerpt?: boolean }) => {
	return (
	// Dangerously set innerHTML here.
	// {
	//     __html: exerpt ? he.decode(html).substring(0,200) : he.decode(html)
	// }
		<span dangerouslySetInnerHTML={{ __html: he.decode(html) }} />

	);
};

export default HtmlDecoder;