// CÁC BẢNG BÊN DƯỚI KÈM THEO ID, CREATE DATE, DATE UPDATE

const Student = {
    fristName: 'Tường',
    lastName: 'Lê Nhật',
    image: 'src/imange/18110234.jpg',
    gender: 'Nam',
    dateOfBirth: '11/05/2000',
    ethnicGroup: 'Kinh',
    major: 'Công nghệ thông tin',
    studentId: '18110234',
    class: '18110CLST1',
    faculty: 'LCH Khoa Đào tạo chất lượng cao',
    position: 'Ủy viên BTV Đoàn khoa Đào tạo Chất lượng cao',
    phoneNumber: '0354941876',
    email: '18110234@student.hcmute.edu.vn',
    googleId: '123456',
    address: '22 Hữu Nghị, Phường Bình Thọ, Tp. Thủ Đức, Tp. Hồ Chí Minh',
    role: 'DOAN_VIEN',
    unionMemberInfo : {
        memberType: 'Đoàn viên',
        joinDate: '26/03/2015',
        joinPlace: 'Trường THCS Mai Thị Hồng Hạnh',
        cardNumber: '123456789',
        submitedBookStatus: true
    },
    actived: true
}


const Manager = {
    firstName: 'Tường',
    lastName: 'Lê Nhật',
    image: 'src/imange/18110234.jpg',
    gender: 'Nam',
    dateOfBirth: '11/05/2000',
    ethnicGroup: 'Kinh',
    major: 'Công nghệ thông tin',
    studentId: '18110234',
    class: '18110LC1C',
    faculty: 'Đào tạo chất lượng cao',
    position: 'Bí thư Đoàn khoa',
    phoneNumber: '0123456789',
    email: 'yfhq@hcmute.edu.vn',
    password: 'Hash password',
    address: '01 Võ Văn Ngân', // Chắc cần phải phân địa chỉ ra rõ luôn
    role: 'DOAN_KHOA', // DOAN_TRUONG, CTV_DOAN_TRUONG, DOAN_KHOA, CHI_DOAN, DOAN_VIEN
    isValidatedEmail: true,
    isActived: true
}


const Faculty = {
    name: 'Khoa đào tạo Chất lượng cao',
    description: 'Cao quá',
    image: 'src/imange/18110234.jpg',
    phoneNumber: '0123456789',
    email: 'yfhq@hcmute.edu.vn',
    type: 'DOAN_KHOA', // DOAN_KHOA, DOAN_TRUONG, PHONG_BAN
    isDisplayed: true
}

const Class = {
    name: '18110CL1C',
    description: 'Lớp Công nghệ thông tin',
    faculty: 'Khoa ĐT CLC',
    mamagers: [
        {
            position: 'Bí thư',
            studentId: '18110234'
        },
        {
            position: 'Phó bí thư',
            studentId: '18110207'
        }
    ]
}

const Product = {
    name: 'Truy thu Đoàn phí',
    description: 'Từ ngày 1/1/2022 đến ngày 31/12/2022',
    price: 2000,
    isDisplayed: true
}

const Bill = {
    studentId: '18110234',
    createDate: '11/05/2022',
    schoolYear: '2021_2022',
    order: [
        {
            type: 'Đoàn phí',
            quantity: 12,
            detail: 'Từ ngày 1/1/2022 đến ngày 31/12/2022',
            price: 2000,
            total: 24000
        },
        {
            type: 'Truy thu Đoàn phí',
            quantity: 3,
            detail: 'Từ ngày 1/1/2022 đến ngày 31/12/2022',
            price: 2000,
            total: 6000
        },
        {
            type: 'Công trình thanh niên',
            quantity: 12,
            detail: 'Từ ngày 1/1/2022 đến ngày 31/12/2022',
            price: 2000,
            total: 24000
        },
        {
            type: 'Thẻ hội viên',
            quantity: 1,
            detail: 'Làm mới thẻ hội viên',
            price: 2000,
            total: 2000
        }
    ],
    paymentDate: '11/05/2022',
    status: 'Đã thanh toán'
}

const SchoolYear = {
    name: '2021-2022',
    discription: 'Năm học 2021-2022',
    startDate: '1/8/2021',
    endDate: '1/8/2022',
    isDisplayed: true
}