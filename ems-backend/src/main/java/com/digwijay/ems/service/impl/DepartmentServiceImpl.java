package com.digwijay.ems.service.impl;

import com.digwijay.ems.dto.DepartmentDto;
import com.digwijay.ems.entity.Department;
import com.digwijay.ems.exception.ResourceNotFoundException;
import com.digwijay.ems.mapper.DepartmentMapper;
import com.digwijay.ems.repository.DepartmentRepository;
import com.digwijay.ems.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;
    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = departmentRepository.save(DepartmentMapper.toDepartment(departmentDto));
        return DepartmentMapper.toDepartmentDto(department);
    }

    @Override
    public DepartmentDto getDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department with department id: " + departmentId + " is not exist"));
        return DepartmentMapper.toDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentDto> departmentDtos = departments.stream().map(DepartmentMapper::toDepartmentDto)
                .toList();
        return departmentDtos;
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department with department id: " + departmentId + " is not exist"));
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());

        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.toDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        departmentRepository.deleteById(departmentId);
    }
}
