import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    // semester name --> semester code

    // type TAcademicSemesterNameCodeMapper = {
    //     Autumn: '1',
    //     Summer: '2',
    //     Fall: '3',
    // }
    // const academicSemesterNameCodeMapper:TAcademicSemesterNameCodeMapper = {
    //     Autumn: '1',
    //     Summer: '2',
    //     Fall: '3',
    // };

    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.create(payload);

    return result;
};

const getSingleAcademicSemesterFroDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
};

const updateAcademicSemesterFroDB = async (
    id: string,
    payload: Partial<TAcademicSemester>
) => {
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error('Invalid Semester Code');
    }

    const result = await AcademicSemester.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};

const getAllAcademicSemesterFroDB = async () => {
    const result = await AcademicSemester.find();
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getSingleAcademicSemesterFroDB,
    updateAcademicSemesterFroDB,
    getAllAcademicSemesterFroDB,
};
