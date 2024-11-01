const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("node:fs");

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
// getLinksFromURL(url).then((links) => {
// 	const uniqueLinks = new Set([...links]);
// 	console.log("Liste des liens trouvés :", uniqueLinks);
// });

const urls = [
	// "https://elysees-marbeuf.fr/metiers/",
	"https://elysees-marbeuf.fr/metiers/account-manager-2/",
	"https://elysees-marbeuf.fr/metiers/area-manager/",
	"https://elysees-marbeuf.fr/metiers/assistant-administration-des-ventes/",
	"https://elysees-marbeuf.fr/metiers/assistant-import-export/",
	"https://elysees-marbeuf.fr/metiers/assistant-marketing/",
	"https://elysees-marbeuf.fr/metiers/attache-commercial/",
	"https://elysees-marbeuf.fr/metiers/barbier/",
	"https://elysees-marbeuf.fr/metiers/beautyadvisor/",
	"https://elysees-marbeuf.fr/metiers/business-development-manager/",
	"https://elysees-marbeuf.fr/metiers/charge-daffaires/",
	"https://elysees-marbeuf.fr/metiers/charge-detudes/",
	"https://elysees-marbeuf.fr/metiers/conseiller-clientele/",
	"https://elysees-marbeuf.fr/metiers/charge-de-communication/",
	"https://elysees-marbeuf.fr/metiers/charge-de-communication-evenementielle/",
	"https://elysees-marbeuf.fr/metiers/charge-de-marketing-operationnel/",
	"https://elysees-marbeuf.fr/metiers/chef-dentreprise/",
	"https://elysees-marbeuf.fr/metiers/chef-de-produit/",
	"https://elysees-marbeuf.fr/metiers/chef-de-projet/",
	"https://elysees-marbeuf.fr/metiers/chef-de-secteur/",
	"https://elysees-marbeuf.fr/metiers/chef-des-ventes/",
	"https://elysees-marbeuf.fr/metiers/coiffeur/",
	"https://elysees-marbeuf.fr/metiers/conseiller-commercial/",
	"https://elysees-marbeuf.fr/metiers/conseiller-de-vente/",
	"https://elysees-marbeuf.fr/metiers/community-manager/",
	"https://elysees-marbeuf.fr/metiers/conseiller-formateur/",
	"https://elysees-marbeuf.fr/metiers/directeur-artistique/",
	"https://elysees-marbeuf.fr/metiers/responsable-commercial/",
	"https://elysees-marbeuf.fr/metiers/directeur-dinstitut/",
	"https://elysees-marbeuf.fr/metiers/directeur-marketing/",
	"https://elysees-marbeuf.fr/metiers/e-commerce-manager/",
	"https://elysees-marbeuf.fr/metiers/estheticienne/",
	"https://elysees-marbeuf.fr/metiers/influence-marketing-manager/",
	"https://elysees-marbeuf.fr/metiers/manager/",
	"https://elysees-marbeuf.fr/metiers/manager-de-salon-de-coiffure/",
	"https://elysees-marbeuf.fr/metiers/maquilleuse-professionnelle/",
	"https://elysees-marbeuf.fr/metiers/merchandiser/",
	"https://elysees-marbeuf.fr/metiers/prothesiste-ongulaire/",
	"https://elysees-marbeuf.fr/metiers/responsable-de-magasin/",
	"https://elysees-marbeuf.fr/metiers/responsable-de-parfumerie/",
	"https://elysees-marbeuf.fr/metiers/responsable-de-point-de-vente/",
	"https://elysees-marbeuf.fr/metiers/responsable-de-salon-de-coiffure/",
	"https://elysees-marbeuf.fr/metiers/responsable-des-achats/",
	"https://elysees-marbeuf.fr/metiers/responsable-logistique/",
	"https://elysees-marbeuf.fr/metiers/responsable-de-spa/",
	"https://elysees-marbeuf.fr/metiers/store-manager/",
	"https://elysees-marbeuf.fr/metiers/technico-commercial/",
	"https://elysees-marbeuf.fr/metiers/traffic-manager/",
	"https://elysees-marbeuf.fr/metiers/visual-merchandiser/",
];

const getTextFromURL = async (url) => {
	const { data } = await axios.get(url);
	const $ = cheerio.load(data);

	const h1 = $("h1").text();
	console.log("h1: ", h1);

	// Supprime les balises img et leurs attributs
	$("img").replaceWith("");

	// Récupère le texte du contenu principal
	let text = $(".et_builder_inner_content.et_pb_gutters3").text();

	// Nettoie le texte
	text = text
		.trim()
		.replace(/\n{2,}/g, "\n")
		.replace(/\s+/g, " ")
		.replace(/©.*$/, "")
		// Supprime tous les attributs d'image qui pourraient rester dans le texte
		.replace(/decoding="[^"]*"/g, "")
		.replace(/width="\d+"/g, "")
		.replace(/height="\d+"/g, "")
		.replace(/src="[^"]*"/g, "")
		.replace(/alt="[^"]*"/g, "")
		.replace(/srcset="[^"]*"/g, "")
		.replace(/sizes="[^"]*"/g, "")
		.replace(/class="[^"]*"/g, "");

	return { h1, text };
};

const metiers = [];

const main = async () => {
	for (const url of urls) {
		console.log("url: ", url);
		const { h1, text } = await getTextFromURL(url);
		// console.log("h1: ", h1);
		// console.log("text: ", text);
		metiers.push({ h1, text });
		// break;
	}

	console.log("metiers: ", metiers);

	// write to file
	fs.writeFileSync("metiers.json", JSON.stringify(metiers, null, 2));
};

main();
