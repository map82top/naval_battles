import { axios } from "core";

export default {
    getAllUserPacks: () => axios.get("/packs/get_all_user_packs"),
    getPack: postData => axios.post("/packs/get_pack", postData),
    savePack: postData => axios.post("/packs/save_pack", postData),
    deletePack: postData => axios.post("/packs/delete_pack", postData),
};