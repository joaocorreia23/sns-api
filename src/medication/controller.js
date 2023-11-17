const pool = require("../../db");

const Get_Medication = (req, res) => {
    pool.query("SELECT * FROM get_medications()", (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const Get_Medication_Disabled = (req, res) => {
    pool.query("SELECT * FROM get_medications(null, null, 0)", (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const Get_Medication_DataTable = (req, res) => {
    pool.query("SELECT * FROM get_medications()", (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};

const Get_Medication_DataTable_Disabled = (req, res) => {
    pool.query("SELECT * FROM get_medications(null, null, 0)", (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};

const Get_MedicationByHashedId = (req, res) => {
    const hashed_id = req.params.hashed_id;
    pool.query("SELECT * FROM get_medications(NULL, $1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json({ "status": true, "data": results.rows[0] });
    });
};

const Add_Medication = (req, res) => {
    const { medication_name } = req.body;
    pool.query("SELECT * FROM create_medication($1)", [medication_name], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação adicionada com sucesso!" });
    });
};

const Update_Medication = (req, res) => {
    const { hashed_id, medication_name, status } = req.body;
    pool.query("SELECT * FROM update_medication(NULL, $1, $2, $3)", [hashed_id, medication_name, status], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação atualizada com sucesso!" });
    });
};

const Deactivate_Medication = (req, res) => {
    const { hashed_id } = req.body
    pool.query("SELECT * FROM change_medication_status(NULL, $1, 0)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação desativada com sucesso!" });
    });
};

const Activate_Medication = (req, res) => {
    const { hashed_id } = req.body
    pool.query("SELECT * FROM change_medication_status(NULL, $1, 1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação ativada com sucesso!" });
    });
};

const Add_Usual_Medication = (req, res) => {
    const { hashed_id_medication_prescription } = req.body;
    pool.query("SELECT * FROM add_to_usual_medication(NULL, $1)", [hashed_id_medication_prescription], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação adicionada com sucesso!" });
    });
};

const Remove_Usual_Medication = (req, res) => {
    const { hashed_id_medication_prescription } = req.body;
    pool.query("SELECT * FROM remove_from_usual_medication(NULL, $1)", [hashed_id_medication_prescription], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação removida com sucesso!" });
    });
};

const Get_Usual_Medication = (req, res) => {
    const { hashed_id_patient, status} = req.body;
    pool.query("SELECT * FROM get_usual_medication(NULL, $1, $2)", [hashed_id_patient, status], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows });
    });
};

const Get_Usual_Medication_DataTable = (req, res) => {
    const { hashed_id_patient, status} = req.body;
    pool.query("SELECT * FROM get_usual_medication(NULL, $1, $2)", [hashed_id_patient, status], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};

const Request_Usual_Medication = (req, res) => {
    const { hashed_id_patient, hashed_id_medication } = req.body;
    pool.query("SELECT * FROM add_to_usual_medication_request(NULL, $1, NULL, $2)", [hashed_id_medication, hashed_id_patient], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "message": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Medicação solicitada com sucesso!" });
    });
};

const Respond_Usual_Medication_Request = (req, res) => {
    const { hashed_id_usual_medication_request, status } = req.body;
    pool.query("SELECT * FROM change_request_status(NULL, $1, $2)", [hashed_id_usual_medication_request, status], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "message": error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Resposta enviada com sucesso!" });
        
    });
};

const Get_Usual_Medication_Requests_DataTable = (req, res) => {
    const hashed_id_health_unit = req.body.hashed_id_health_unit !== undefined && req.body.hashed_id_health_unit !== '' ? req.body.hashed_id_health_unit : null;
    const hashed_id_doctor = req.body.hashed_id_doctor !== undefined && req.body.hashed_id_doctor !== '' ? req.body.hashed_id_doctor : null;
    const hashed_id_patient = req.body.hashed_id_patient !== undefined && req.body.hashed_id_patient !== '' ? req.body.hashed_id_patient : null;
    const status = req.body.status !== undefined && req.body.status !== '' ? req.body.status : null;
    pool.query("SELECT * FROM get_usual_medication_requests(NULL, $1, NULL, $2, NULL, $3, $4)", [hashed_id_health_unit, hashed_id_doctor, hashed_id_patient, status], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, "error": error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};


module.exports = {
    Get_Medication,
    Get_Medication_Disabled,
    Get_Medication_DataTable,
    Get_Medication_DataTable_Disabled,
    Get_MedicationByHashedId,
    Add_Medication,
    Update_Medication,
    Deactivate_Medication,
    Activate_Medication,
    Add_Usual_Medication,
    Remove_Usual_Medication,
    Get_Usual_Medication,
    Get_Usual_Medication_DataTable,
    Request_Usual_Medication,
    Respond_Usual_Medication_Request,
    Get_Usual_Medication_Requests_DataTable
};