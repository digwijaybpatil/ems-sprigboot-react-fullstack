package com.digwijay.ems.service.impl;

import com.digwijay.ems.dto.EmployeeDto;
import com.digwijay.ems.entity.Department;
import com.digwijay.ems.entity.Employee;
import com.digwijay.ems.exception.ResourceNotFoundException;
import com.digwijay.ems.mapper.EmployeeMapper;
import com.digwijay.ems.repository.DepartmentRepository;
import com.digwijay.ems.repository.EmployeeRepository;
import com.digwijay.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;

    private DepartmentRepository departmentRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.toEmployee(employeeDto);

        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                                    .orElseThrow(() -> new ResourceNotFoundException("Department is not exist with department id: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department);

        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.toEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not found by Id: " + id));
        return EmployeeMapper.toEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map( (employee) -> EmployeeMapper.toEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not found by id: " + employeeId));

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        Department department = departmentRepository.findById(employeeDto.getDepartmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Department is not exist with department id: " + employeeDto.getDepartmentId()));
        employee.setDepartment(department);

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.toEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not found by id: " + employeeId));

        employeeRepository.deleteById(employeeId);
    }
}
