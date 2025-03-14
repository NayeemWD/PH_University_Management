import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
};

const updateAcademicDepartmentFromDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>
) => {
    const result = await AcademicDepartment.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};

export const AcademicDepartments = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentFromDB,
};
