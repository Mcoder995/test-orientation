const axios = require("axios");
const cheerio = require("cheerio");

async function getLinksFromURL(url) {
	try {
		// Récupère le contenu HTML de l'URL
		const { data } = await axios.get(url);

		// Charge le contenu HTML avec Cheerio
		const $ = cheerio.load(data);

		// Récupère tous les liens et les met dans un tableau
		const links = [];
		$("a").each((index, element) => {
			const link = $(element).attr("href");
			if (link) {
				if (link.includes("metiers")) links.push(link);
			}
		});

		return links;
	} catch (error) {
		console.error(
			`Erreur lors de la récupération des liens : ${error.message}`,
		);
	}
}

// Exemple d'utilisation
const url = "https://elysees-marbeuf.fr/metiers/"; // Remplacez par l'URL souhaitée
getLinksFromURL(url).then((links) => {
	const uniqueLinks = new Set([...links]);
	console.log("Liste des liens trouvés :", uniqueLinks);
});
