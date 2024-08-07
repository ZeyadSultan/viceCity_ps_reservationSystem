package org.example.exception;

import org.example.dto.ErrorDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(@NonNull MethodArgumentNotValidException ex, @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, @NonNull WebRequest request) {
        System.out.println("MethodArgumentNotValidException");
        System.out.println(ex.getClass());

        Map<String, String> result = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
                    String field = ((FieldError) error).getField();
                    String message = error.getDefaultMessage();
                    result.put(field, message);
                }
        );

        return ResponseEntity.badRequest().body(result);
    }



    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorDto> handleCustomException(CustomException ex, WebRequest request) {
        System.out.println("CustomException");
        System.out.println(ex.getClass());

        ErrorDto errorDto = new ErrorDto(ex.getMessage());
        return new ResponseEntity<>(errorDto, ex.getHttpStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> handleGlobalException(Exception ex, WebRequest request) {
        System.out.println("INTERNAL_SERVER_ERROR");
        System.out.println(ex.getClass());

        ErrorDto errorDto = new ErrorDto(ex.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}