package com.digwijay.ems.mapper;

import com.digwijay.ems.dto.DepartmentDto;
import com.digwijay.ems.entity.Department;

public class DepartmentMapper {

    public static Department toDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }

    public static DepartmentDto toDepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }
}
