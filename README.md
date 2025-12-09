# My_custom_Portfolio

A personal portfolio website that integrates an AI assistant built with Flowise. This repository contains the website source, the exported Flowise app (JSON), and documentation for the final project submission for UCMN-S12526-IT-ELAILEC-39669 — Finals 12/2025.

---

## Project Snapshot

- Project: Personal portfolio website with embedded RAG (Retrieval-Augmented Generation) chatbot
- Student / Owner: AKUMON12
- Course / Assessment: UCMN-S12526-IT-ELAILEC-39669 - Finals 12/2025
- Deliverables in this repo:
  - Website source code (frontend)
  - Exported Flowise app (.json)
  - Documentation and deployment links (placeholders below)

---

## What this system is about

This project demonstrates an AI-powered portfolio site where visitors can browse projects and interact with an intelligent assistant. The assistant is implemented using a Flowise app (visual Flow-based builder) configured to perform RAG: it retrieves relevant documents from a vector store and generates helpful, context-aware responses.

Key goals:
- Showcase projects and professional details via a modern website.
- Provide an AI assistant embedded into the website to answer questions about the portfolio, projects, and any uploaded documentation.
- Fulfill final project requirements for domain/subdomain, Flowise deployment, RAG implementation, website assistant integration, and testing.

---

## How it functions (architecture & flow)

1. Website (Frontend)
   - Hosts the portfolio and an embedded UI element (chat widget / iframe / custom modal).
   - Sends user queries to a backend or directly to an API endpoint that forwards to the Flowise app.

2. Flowise App (AI Orchestration)
   - Flowise handles the RAG pipeline: user query → vector DB retrieval → prompt templating → LLM generation.
   - Exports and deploys as a standalone Flowise app that can be hosted on a cloud platform that supports Flowise (or a container).

3. Vector Store & Documents
   - Portfolio documents, project descriptions, and supplementary files are embedded into a vector store (e.g., Milvus, Pinecone, or local FAISS) using an embedding model.
   - The Flowise flow queries the vector store to find the most relevant context for a given user question.

4. Response Delivery
   - Flowise returns the generated answer (and optionally the retrieved passages) back to the website chat UI.
   - The website displays the assistant's response to the user in real-time.

---

## Getting started (developer notes)

Prerequisites
- Node.js and package manager (npm / yarn) for website
- Flowise installed or access to a Flowise hosting environment
- LLM API key (if using a hosted model like OpenAI, or a self-hosted LLM endpoint)
- Vector DB or local vector index for RAG

Local run (example)
1. Clone repo:
   git clone https://github.com/AKUMON12/My_custom_Portfolio.git
2. Install dependencies:
   cd My_custom_Portfolio
   npm install
3. Start the website:
   npm start
4. Flowise:
   - Import the exported Flowise JSON into your Flowise workspace.
   - Configure environment variables (API keys, vector DB credentials).
   - Deploy the Flowise app to the cloud or run locally.

See the repository folders for more detailed run instructions and configuration files.

---

## Flowise app & artifacts

- Website link: (PLACEHOLDER) https://your-portfolio-domain.example
- Flowise (deployed) link: (PLACEHOLDER) https://your-deployed-flowise.example
- Exported Flowise app (.json): path/to/flowise-export.json in this repository

Notes:
- The exported Flowise JSON is included so graders can import and inspect the exact flows used for the RAG pipeline.
- The deployed Flowise app link should be to the cloud-hosted Flowise instance (publicly reachable) that is connected to the same vector store and environment variables as documented.

---

## UCMN-S12526-IT-ELAILEC-39669 - Finals 12/2025

Final project requirements:

1. Website link
2. Link on deployed Flowise app
3. Exported Flowise app in .json

Final Requirements (grading breakdown)
- Domain | SubDomain .......................................... 20%
- Flowise app deployed to cloud ............................. 20%
- Implement the RAG application chatbot ..................... 20%
- Website with the AI assistant ............................. 20%
- Testing .................................................. 20%

Total ................................................................ 100%

Submission checklist:
- [ ] Public website URL (domain / subdomain)
- [ ] Deployed Flowise app URL (cloud)
- [ ] Export file: flowise-export.json included in repo
- [ ] Short demo video (optional but recommended)
- [ ] Test plan and test results included (unit/integration checks for RAG, response quality)

---

## Testing & Evaluation

Suggested testing approach to maximize score (map to the 20% testing component):
- Unit tests for website components (chat UI)
- Integration tests for chat → Flowise → vector store pipeline
- Manually validate RAG responses: correctness, relevance, and hallucination checks
- Log test cases and sample queries/responses in tests/test-cases.md

---

## Where to put links / files in this repo

- Website entry: / (root of the repo)
- Exported Flowise JSON: /flowise-export/flowise-app-export.json
- Documentation & test results: /docs/
- Deployment notes: /docs/deployment.md

---

## Contact & Support

If you need any help connecting the website to the Flowise app, deploying Flowise to a supported cloud provider, or preparing the export file, open an issue in this repository or contact AKUMON12.

---
