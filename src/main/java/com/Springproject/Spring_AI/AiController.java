package com.Springproject.Spring_AI;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/ai")
public class AiController {

    private final OllamaChatModel client;
    private static final String PROMPT = "WHAT IS JAVA";

    @Autowired
    public AiController(OllamaChatModel client) {
        this.client = client;
    }

    @GetMapping("/prompt")
    public Mono<Flux<String>> promptResponse(@RequestParam("prompt") String prompt) {
        return Mono.just(client.stream(prompt));
    }
}
