// Node Modules ============================================================ //
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

// Styles ================================================================== //
import styles from './ReceiptModal.module.css';

// Material UI ============================================================= //
import { Backdrop, Box, Button, Modal } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

// ===========================|| RECEIPT MODAL ||=========================== //
const ReceiptModal = ({ openModal, onClose, student, bill }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const receipt = (
            <div className={styles.Receipt}>
                <div className={styles.Top}>
                    <div className={styles.Left}>
                        <div>THÀNH ĐOÀN TP. HỒ CHÍ MINH</div>
                        <div><b>BCH ĐOÀN TRƯỜNG ĐH SƯ PHẠM KỸ THUẬT</b></div>
                        <div><b>THÀNH PHỐ HỒ CHÍ MINH</b></div>
                        <div><b>***</b></div>
                    </div>
                    <div className={styles.Right}>
                        <div><b><u>ĐOÀN TNCS HỒ CHÍ MINH</u></b></div>
                    </div>
                </div>
                <div className={styles.Date}>TP. Hồ Chí Minh, ngày {moment(bill?.ngatThanhToan).get('date')} tháng {moment(bill?.ngatThanhToan).get('month') + 1} năm {moment(bill?.ngatThanhToan).get('year')}</div>
                <div className={styles.Title}><h3>BIÊN NHẬN</h3></div>
                <div className={styles.Body}>
                    <div className={styles.Cols}>
                        <div className={styles.ColLeft}>
                            <div className={styles.Record}>Nhận của: <b>{student?.ho + ' ' + student?.ten}</b></div>
                            <div className={styles.Record}>Ngày sinh: {moment(student?.ngaySinh).format('DD/MM/yyyy')}</div>
                            <div className={styles.Record}>Đoàn khoa: {student?.donVi?.tenDonVi}</div>               
                        </div>
                        <div className={styles.ColRight}>
                            <div className={styles.Record}>Mã số sinh viên: <b>{student?.maSoSV}</b></div>
                            <div className={styles.Record}>Chi đoàn: {student?.lopSV?.tenLop}</div>
                            <div className={styles.Record}>Ngày vào Đoàn: {moment(student?.thongTinDoanVien?.ngayVaoDoan).format('DD/MM/yyyy')}</div>
                        </div>
                    </div>
                    <div className={styles.Include}>
                        <div className={styles.Record}>Hồ sơ gồm</div>
                        <ul className={styles.Items}>
                            {bill?.cacKhoanPhi?.map(i => 
                                i.tenChiPhi === 'Đoàn phí' 
                                ? <li className={styles.Record}>{`${i.thuTu}. ${i.tenChiPhi}: ${i.donGia}đ x ${i.soLuong} ${i.donViTinh} = ${i.thanhTien}đ (Từ ${moment(i.ngayBatDau).format('DD/MM/yyyy')} đến ${moment(i.ngayKetThuc).format('DD/MM/yyyy')}) (${i.thuTu})`}</li>
                                : <li className={styles.Record}>{`${i.thuTu}. ${i.tenChiPhi}: ${i.donGia}đ x ${i.soLuong} ${i.donViTinh} = ${i.thanhTien}đ (${i.thuTu})`}</li>
                            )}
                        </ul>
                        <div className={styles.Total}>Tổng tiền = (1) + (2) + (3) + (4) + (5) đ = {bill?.tongTien}đ</div>
                    </div>
                    <div className={styles.Note}><b><u>Ghi chú:</u> Đoàn viên giữ biên nhận để rút sổ Đoàn</b></div>
                    <div className={styles.Bottom}>
                        <div className={styles.Space}></div>
                        <div className={styles.Receiver}><b>Người nhận</b></div>
                    </div>
                </div>
            </div>
        )

    return (
        <div>
            <Modal
                className={styles.Modal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={onClose}
            >
                <>
                    <div className={styles.Header}>
                        <Button onClick={onClose}>Về trang barcode</Button>
                        <Button 
                            onClick={handlePrint} 
                            variant='contained' 
                            className='button'
                            endIcon={<PrintIcon />}
                        >
                            In hóa đơn
                        </Button>
                        <div style={{ width: '180px'}}></div>
                    </div>
                    <div className={styles.Divider}></div>
                    <div className={styles.Content}>
                        <div className={styles.PrintArea} ref={componentRef}>
                            {receipt}
                            <div className={styles.PrintDivider}></div>
                            {receipt}
                        </div>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default ReceiptModal