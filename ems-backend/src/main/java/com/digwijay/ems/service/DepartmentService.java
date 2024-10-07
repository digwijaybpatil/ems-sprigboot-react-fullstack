package com.digwijay.ems.service;

import com.digwijay.ems.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    DepartmentDto createDepartment(DepartmentDto departmentDto);

    DepartmentDto getDepartment(Long departmentId);

    List<DepartmentDto> getAllDepartments();

    DepartmentDto updateDepartment(Long DepartmentId, DepartmentDto departmentDto);

    void deleteDepartment(Long departmentId);
}
