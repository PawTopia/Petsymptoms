const data = require('./data.json');

const GetSymptoms = (request, h) => {
    try {
        // Jika berhasil, kirim respons dengan status code 200 dan pesan success
        return h.response({ success: true, message: 'Data gejala berhasil diperoleh.', data: data.gejala }).code(200);
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons dengan status code 500 dan pesan error
        return h.response({ success: false, error: 'Terjadi kesalahan dalam mendapatkan gejala.' }).code(500);
    }
}

const PostSymptoms = (request, h) => {
    try {
        const selectedGejala = request.payload.gejala;

        if (selectedGejala) {
            const gejala = selectedGejala
                //.map((value, index) => (value === 1 ? data.gejala[index].nama : null))
                // POST data sesuai dengan id dan menampilkannya 
                .map((id) => {
                    const matchedSymptom = data.gejala.find((symptom) => symptom.id === id);
                    return matchedSymptom ? matchedSymptom.nama : null;
                })
                .filter(Boolean);

            if (gejala.length > 0) {
                // Jika berhasil, kirim respons dengan status code 201 dan data gejala
                return h.response({ success: true, message: 'Gejala berhasil dipost.', gejala }).code(201);
            } else {
                // Jika tidak ada gejala yang dipilih, kirim respons dengan status code 400 dan pesan kesalahan
                return h.response({ error:'Tidak ada gejala yang dipilih.' }).code(400);
            }
        } else {
            // Jika gagal, kirim respons dengan status code 400 dan pesan kesalahan
            return h.response({success: false, message:'Gejala tidak ditemukan.' }).code(400);
        }
    } catch (error) {
        // Jika terjadi kesalahan, kirim respons dengan status code 500 dan pesan kesalahan
        return h.response({ success: false, message: 'Terjadi kesalahan dalam memposting gejala.' }).code(500);
    }
};

module.exports = {
    GetSymptoms,
    PostSymptoms
};