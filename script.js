import { jobsClassification, jobs } from "./category.js";
import {
	functionalQuestions,
	careerLevelQuestions,
	competencyQuestions,
} from "./questions.js";

// Génère les questions dans le formulaire
function generateQuestions(sectionId, questions, type) {
	const section = document.getElementById(sectionId);
	questions.forEach((questionObj, index) => {
		const questionDiv = document.createElement("div");
		questionDiv.className = "mb-4";

		const questionText = document.createElement("p");
		questionText.className = "font-semibold";
		questionText.textContent = questionObj.question;
		questionDiv.appendChild(questionText);

		for (const answer of questionObj.answers) {
			const answerLabel = document.createElement("label");
			answerLabel.className = "block mt-2";

			const answerInput = document.createElement("input");
			answerInput.type = "radio";
			answerInput.name = `${type}-${index}`;
			answerInput.value = answer[`${type}Id`];
			answerInput.className = "mr-2";
			answerLabel.appendChild(answerInput);

			answerLabel.appendChild(document.createTextNode(answer.text));
			questionDiv.appendChild(answerLabel);
		}

		section.appendChild(questionDiv);
	});
}

// Initialise les questions
generateQuestions(
	"functional-questions",
	functionalQuestions,
	"functionalField",
);
generateQuestions(
	"career-level-questions",
	careerLevelQuestions,
	"careerLevel",
);
generateQuestions("competency-questions", competencyQuestions, "competency");

// Calcul des résultats en fonction des réponses
function calculateResults() {
	const selectedAnswers = {
		functionalFieldId: [],
		careerLevelId: [],
		competencyId: [],
	};

	// Vérifie que toutes les questions ont une réponse
	const totalQuestions =
		functionalQuestions.length +
		careerLevelQuestions.length +
		competencyQuestions.length;
	const answeredQuestions = document.querySelectorAll(
		'input[type="radio"]:checked',
	).length;

	if (answeredQuestions < totalQuestions) {
		alert(
			"Veuillez répondre à toutes les questions avant de voir les résultats.",
		);
		return;
	}

	// Récupère les réponses sélectionnées
	for (const input of document.querySelectorAll(
		'input[type="radio"]:checked',
	)) {
		if (input.name.includes("functionalField"))
			selectedAnswers.functionalFieldId.push(Number.parseInt(input.value));
		if (input.name.includes("careerLevel"))
			selectedAnswers.careerLevelId.push(Number.parseInt(input.value));
		if (input.name.includes("competency"))
			selectedAnswers.competencyId.push(Number.parseInt(input.value));
	}

	// Calcule les scores pour chaque métier
	const jobScores = {};
	for (const job of jobsClassification) {
		let score = 0;
		score += job.functionalFieldIds.filter((id) =>
			selectedAnswers.functionalFieldId.includes(id),
		).length;
		score += job.careerLevelIds.filter((id) =>
			selectedAnswers.careerLevelId.includes(id),
		).length;
		score += job.competencyIds.filter((id) =>
			selectedAnswers.competencyId.includes(id),
		).length;
		jobScores[job.jobId] = score;
	}

	// Trie les métiers en fonction des scores
	const sortedJobs = Object.entries(jobScores)
		.sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
		.map(([jobId]) => jobs[jobId]);

	// Affiche les résultats
	const resultsDiv = document.getElementById("results");
	const recommendedJobs = document.getElementById("recommended-jobs");
	recommendedJobs.innerHTML = "";
	for (const job of sortedJobs.slice(0, 5)) {
		const jobItem = document.createElement("li");
		jobItem.textContent = job;
		recommendedJobs.appendChild(jobItem);
	}
	resultsDiv.classList.remove("hidden");
}

// Attend que le DOM soit chargé avant d'ajouter l'écouteur d'événement
document.addEventListener("DOMContentLoaded", () => {
	const submitButton = document.getElementById("submit-quiz");
	console.log("submitButton: ", submitButton);
	if (submitButton) {
		submitButton.addEventListener("click", calculateResults);
	} else {
		console.error("Le bouton 'submit-quiz' n'a pas été trouvé dans le DOM");
	}
});
