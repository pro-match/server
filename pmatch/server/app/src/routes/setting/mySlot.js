const express = require('express');
const router = express.Router();
const { Pro } = require('../../models/model');

router.post('/:proId', async (req, res) => {
    try {
        const proId = req.params.proId; // URL 파라미터에서 프로의 사용자 정의 ID 추출
        const slotSetting = req.body; // 요청 본문에서 슬롯 설정 추출

        // 해당 사용자 정의 ID를 가진 프로 찾기
        const pro = await Pro.findOne({ pro_id: proId });
        if (!pro) {
            return res.status(404).send('Pro not found');
        }

        // 슬롯 설정 업데이트
        pro.slot = slotSetting;

        await pro.save();
        res.status(201).send('Slot settings updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
