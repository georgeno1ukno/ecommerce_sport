package com.ecommerceback.service;

import com.ecommerceback.model.Item;
import com.ecommerceback.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        // Lógica para obtener todos los artículos disponibles
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        // Lógica para obtener un artículo por su ID
        return itemRepository.findById(id);
    }

    public Item saveItem(Item item) {
        // Lógica para agregar o actualizar un artículo
        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        // Lógica para eliminar un artículo
        itemRepository.deleteById(id);
    }
}