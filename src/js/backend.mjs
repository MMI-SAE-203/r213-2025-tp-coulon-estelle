import PocketBase from "pocketbase";
const pb = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((Maison) => {
            Maison.image= pb.files.getURL(Maison, Maison.image);
            return Maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getSurface() {
    try {
        let data = await pb.collection('Maison').getFullList({
            filter: `surface > ${surface}`,
            sort: '-created',
        });
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons avec une surface supérieure à demandé', error);
        return [];
    }
}

export async function addOffre(house) {
    try {
        await pb.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison' + error,
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((Maison) => {
            Maison.image = pb.files.getURL(Maison, Maison.image);
            return Maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function getAgent() {
    try {
        let agent = await pb.collection('agent').getFullList({
            sort: '-created',
        });
        return agent;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des agents', error);
        return [];
    }
}

export async function addAgent(agent) {
    try {
        await pb.collection('agent').create(agent);
        return {
            success: true,
            message: 'Agent ajoutée avec succès'
        };
    } catch (error) {
        console.log("Une erreur est survenue en ajoutant l'agent", error);
        return {
            success: false,
            message: "Une erreur est survenue en ajoutant l'agent" + error,
        };
    }
}

export async function getAgents(id) {
    try {
        let data = await pb.collection('agent').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log("Une erreur est survenue en lisant l'agent", error);
        return null;
    }
}