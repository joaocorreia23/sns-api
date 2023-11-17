const pool = require("../../db");

const Get_Health_Units = (req, res) => {
    pool.query("SELECT * FROM get_health_unit(null, null, 1)", (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const Get_Health_Units_Disabled = (req, res) => {
    pool.query("SELECT * FROM get_health_unit(null, null, 0)", (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const Get_Health_Units_DataTable = (req, res) => {
    pool.query("SELECT * FROM get_health_unit(null, null , 1)", (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};

const Get_Health_Units_DataTable_Disabled = (req, res) => {
    pool.query("SELECT * FROM get_health_unit(null, null , 0)", (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json({ 'recordsFiltered': results.rows.length, 'recordsTotal': results.rows.length, 'data': results.rows });
    });
};

const Get_Health_UnitByHashedId = (req, res) => {
    const hashed_id = req.params.hashed_id;
    pool.query("SELECT * FROM get_health_unit(NULL, $1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows[0]);
    });
};

const Add_Health_Unit = (req, res) => {
    const { name, phone_number, email, type, tax_number, door_number, floor, address, zip_code, county, district } = req.body;
    pool.query("SELECT * FROM create_health_unit($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 137)", [name, phone_number, email, type, tax_number, door_number, floor, address, zip_code, county, district], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Unidade de Saúde Adicionada Com Sucesso!" });
    });
};


const Deactivate_Health_Unit = (req, res) => {
    const { hashed_id } = req.body
    pool.query("SELECT * FROM change_health_unit_status(NULL, $1, 0)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Unidade de Saúde Desativada Com Sucesso!" });
    });
};

const Activate_Health_Unit = (req, res) => {
    const { hashed_id } = req.body;
    pool.query("SELECT * FROM change_health_unit_status(NULL, $1, 1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "data": results.rows[0], "message": "Unidade de Saúde Ativada Com Sucesso!" });
    });
};

const Get_Health_Units_Types = (req, res) => {
    pool.query("SELECT * FROM get_health_unit_types_enum()", (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(200).json(results.rows);
    });
};

const Link_Doctor = (req, res) => {
    const { hashed_id_health_unit, hashed_id_user } = req.body;
    pool.query("SELECT * FROM add_health_unit_doctor(NULL, $1, NULL, $2)", [hashed_id_health_unit, hashed_id_user], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "message": "Médico adicionado à Unidade de Saúde com Sucesso!" });
    });
};

const Unlink_Doctor = (req, res) => {
    const { hashed_id_health_unit, hashed_id_user } = req.body;
    pool.query("SELECT * FROM remove_health_unit_doctor(NULL, $1, NULL, $2)", [hashed_id_health_unit, hashed_id_user], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "message": "Médico removido da Unidade de Saúde com Sucesso!" });
    });
};

const Get_Health_Unit_Doctors = (req, res) => {
    const hashed_id = req.params.hashed_id;
    pool.query("SELECT * FROM get_health_unit_doctors(NULL, $1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        /*     if (results.rows.length == 0) {
              res.status(404).send(`Não existem Médicos associados à Unidade de Saúde!`);
              return;
            } */
        res.status(200).json(results.rows);
    });
};

const Link_Patient = (req, res) => {
    const { hashed_id_health_unit, hashed_id_user } = req.body;
    pool.query("SELECT * FROM add_health_unit_patient(NULL, $1, NULL, $2)", [hashed_id_health_unit, hashed_id_user], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "message": "Paciente adicionado à Unidade de Saúde com Sucesso!" });
    });
};

const Unlink_Patient = (req, res) => {
    const { hashed_id_health_unit, hashed_id_user } = req.body;
    pool.query("SELECT * FROM remove_health_unit_patient(NULL, $1, NULL, $2)", [hashed_id_health_unit, hashed_id_user], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        res.status(201).json({ "status": true, "message": "Paciente removido da Unidade de Saúde com Sucesso!" });
    });
};

const Get_Health_Unit_Patients = (req, res) => {
    const hashed_id = req.params.hashed_id;
    pool.query("SELECT * FROM get_health_unit_patients(NULL, $1)", [hashed_id], (error, results) => {
        if (error) {
            res.status(400).json({ error: error.message });
            return;
        }
        /*     if (results.rows.length == 0) {
              res.status(404).send(`Não existem Médicos associados à Unidade de Saúde!`);
              return;
            } */
        res.status(200).json(results.rows);
    });
};

const Add_Patient_Doctor = (req, res) => {
    const { hashed_id_health_unit, hashed_id_doctor, hashed_id_patient } = req.body;
    pool.query("SELECT * FROM add_patient_doctor(NULL, $1, NULL, $2, NULL, $3)", [hashed_id_health_unit, hashed_id_doctor, hashed_id_patient], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, error: error.message, "message": "Não foi possível adicionar o Utente ao Médico!" });
            return;
        }
        res.status(201).json({ "status": true, "message": "Utente adicionado ao Médico com Sucesso!" });
    });
};

const Remove_Patient_Doctor = (req, res) => {
    const { hashed_id_health_unit, hashed_id_doctor, hashed_id_patient } = req.body;
    pool.query("SELECT * FROM remove_patient_doctor(NULL, $1, NULL, $2, NULL, $3)", [hashed_id_health_unit, hashed_id_doctor, hashed_id_patient], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, error: error.message, "message": "Não foi possível remover o Utente do Médico!" });
            return;
        }
        res.status(201).json({ "status": true, "message": "Utente removido do Médico com Sucesso!" });
    });
};

const Get_Patient_Doctor = (req, res) => {
    const hashed_id_patient = req.params.hashed_id_patient;
    pool.query("SELECT * FROM get_patient_current_health_unit_doctor(NULL, $1)", [hashed_id_patient], (error, results) => {
        if (error) {
            res.status(400).json({ "status": false, error: error.message, "message": "Não foi possível obter o Médico do Utente!" });
            return;
        }
        if (results.rows.length == 0) {
            res.status(400).json({ "status": false, "message": "Não foi possível obter o Médico do Utente!" });
        } else {
            res.status(200).json({ "status": true, "message": "Médico do Utente obtido com Sucesso!", "data": results.rows });
        }
    });
};

module.exports = {
    Get_Health_Units,
    Get_Health_Units_Disabled,
    Get_Health_Units_DataTable,
    Get_Health_Units_DataTable_Disabled,
    Get_Health_UnitByHashedId,
    Add_Health_Unit,
    Deactivate_Health_Unit,
    Activate_Health_Unit,
    Get_Health_Units_Types,
    Link_Doctor,
    Unlink_Doctor,
    Get_Health_Unit_Doctors,
    Link_Patient,
    Unlink_Patient,
    Get_Health_Unit_Patients,
    Add_Patient_Doctor,
    Remove_Patient_Doctor,
    Get_Patient_Doctor
};